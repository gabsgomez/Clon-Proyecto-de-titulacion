import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  subtitle: { fontSize: 16, marginBottom: 10, textAlign: "center" },
  header: {
    fontSize: 14,
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  info: { fontSize: 12, marginBottom: 5 },
  temaInfo: {
    marginTop: 20,
    marginBottom: 30,
    padding: 10,
  },
  temaTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  temaDescription: {
    fontSize: 12,
    marginBottom: 15,
    lineHeight: 1.5,
  },
  objetivos: {
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 20,
  },
  imageContainer: { marginVertical: 10 },
  image: {
    width: "auto",
    height: 200,
    marginVertical: 10,
    alignSelf: "center",
  },
  imageCaption: {
    fontSize: 10,
    textAlign: "center",
    marginTop: 5,
    fontStyle: "italic",
  },
  question: { marginBottom: 15 },
  questionText: { fontSize: 12, marginBottom: 10 },
  option: { fontSize: 10, marginLeft: 20, marginBottom: 5 },
  paragraphQuestion: {
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 20,
    fontStyle: "italic",
  },
  divider: {
    borderBottom: 1,
    borderBottomColor: "#000000",
    borderBottomStyle: "solid",
    marginVertical: 15,
  },
});

const QuestionsPDF = ({ preguntas, nivel, tema, temaInfo }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Cuestionario de Finanzas</Text>
      <Text style={styles.subtitle}>{tema.nombre}</Text>

      <View style={styles.header}>
        <Text style={styles.info}>
          Nivel: {nivel.charAt(0).toUpperCase() + nivel.slice(1)}
        </Text>
        <Text style={styles.info}>Tema: {tema.nombre}</Text>
        <Text style={styles.info}>
          Fecha: {new Date().toLocaleDateString()}
        </Text>
      </View>

      {temaInfo && (
        <View style={styles.temaInfo}>
          <Text style={styles.temaTitle}>Información del Tema</Text>
          <Text style={styles.temaDescription}>{temaInfo.descripcion}</Text>

          {temaInfo.imagenes?.map((imagen, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image src={imagen.data} style={styles.image} />
              {imagen.caption && (
                <Text style={styles.imageCaption}>{imagen.caption}</Text>
              )}
            </View>
          ))}

          <Text style={styles.temaTitle}>Objetivos de Aprendizaje:</Text>
          {temaInfo.objetivos?.split("\n").map((objetivo, index) => (
            <Text key={index} style={styles.objetivos}>
              • {objetivo}
            </Text>
          ))}

          <Text style={styles.temaTitle}>Conceptos Clave:</Text>
          <Text style={styles.temaDescription}>{temaInfo.conceptosClave}</Text>
        </View>
      )}

      <View style={styles.divider} />

      {preguntas.map((pregunta, index) => (
        <View key={index} style={styles.question}>
          <Text style={styles.questionText}>
            Pregunta {pregunta.numero}: {pregunta.pregunta}
          </Text>
          {pregunta.tipo === "opcion_multiple" ? (
            pregunta.opciones.map((opcion, optIndex) => (
              <Text key={optIndex} style={styles.option}>
                {optIndex + 1}. {opcion}
              </Text>
            ))
          ) : (
            <Text style={styles.paragraphQuestion}>
              [Pregunta de desarrollo]
            </Text>
          )}
        </View>
      ))}
    </Page>
  </Document>
);

export default QuestionsPDF;