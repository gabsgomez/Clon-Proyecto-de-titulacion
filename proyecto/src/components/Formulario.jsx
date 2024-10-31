import React, { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";

import {
  Document,
  Page,
  Text,
  View,
  PDFDownloadLink,
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

const ImageUploader = ({ images = [], onImageUpload, onImageRemove }) => {
  const [error, setError] = useState(null);

  const imageArray = useMemo(
    () => (Array.isArray(images) ? images : []),
    [images]
  );

  const onDrop = useCallback(
    (acceptedFiles) => {
      setError(null);
      Promise.all(
        acceptedFiles.map((file) => {
          return new Promise((resolve, reject) => {
            if (!file.type.startsWith("image/")) {
              reject(new Error(`${file.name} no es una imagen válida`));
              return;
            }

            const reader = new FileReader();

            reader.onabort = () =>
              reject(
                new Error(`La lectura del archivo ${file.name} fue abortada`)
              );
            reader.onerror = () =>
              reject(new Error(`Error al leer el archivo ${file.name}`));

            reader.onloadend = () => {
              resolve({
                data: reader.result,
                caption: "",
                title: file.name,
                size: file.size,
                type: file.type,
              });
            };

            reader.readAsDataURL(file);
          });
        })
      )
        .then((newImages) => {
          onImageUpload([...imageArray, ...newImages]);
        })
        .catch((err) => {
          setError(err.message);
          console.error("Error al procesar las imágenes:", err);
        });
    },
    [imageArray, onImageUpload]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [
          ".jpg",
          ".jpeg",
          ".png",
          ".gif",
          ".bmp",
          ".webp",
          ".tiff",
          ".svg",
        ],
      },
      maxSize: 5242880, // 5MB
      maxFiles: 5,
      multiple: true,
    });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path} className="text-red-500 text-sm">
      {file.path} - {errors.map((e) => e.message).join(", ")}
    </li>
  ));

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          }
          ${error ? "border-red-300" : ""}`}
      >
        <input {...getInputProps()} />
        <div className="space-y-2">
          <div className="text-4xl text-gray-400">📸</div>
          <p className="text-gray-600">
            {isDragActive
              ? "Suelta las imágenes aquí"
              : "Arrastra y suelta imágenes aquí, o haz clic para seleccionar"}
          </p>
          <p className="text-sm text-gray-500">
            Formatos permitidos: JPG, JPEG, PNG, GIF, BMP, WEBP, TIFF, SVG |
            Máximo 5MB por archivo
          </p>
        </div>
      </div>

      {/* Mostrar errores si existen */}
      {(error || fileRejections.length > 0) && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600 font-medium">Se encontraron errores:</p>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {fileRejections.length > 0 && (
            <ul className="list-disc list-inside mt-2">{fileRejectionItems}</ul>
          )}
        </div>
      )}

      {/* Vista previa de imágenes */}
      {imageArray.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-700">
              Imágenes cargadas ({imageArray.length})
            </h3>
            <button
              type="button"
              onClick={() => onImageUpload([])}
              className="text-red-500 hover:text-red-600 text-sm px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
            >
              Eliminar todas
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {imageArray.map((image, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 space-y-3 bg-white shadow-sm"
              >
                <div className="relative aspect-video">
                  <img
                    src={image.data}
                    alt={image.title}
                    className="w-full h-full object-contain rounded"
                  />
                </div>
                <div className="space-y-2">
                  <p
                    className="text-sm text-gray-500 truncate"
                    title={image.title}
                  >
                    {image.title}
                  </p>
                  <input
                    type="text"
                    value={image.caption || ""}
                    onChange={(e) => {
                      const newImages = [...imageArray];
                      newImages[index].caption = e.target.value;
                      onImageUpload(newImages);
                    }}
                    placeholder="Agregar descripción..."
                    className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {(image.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                    <button
                      type="button"
                      onClick={() => onImageRemove(index)}
                      className="text-red-500 hover:text-red-600 text-sm px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Componente para el PDF
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
          {temaInfo.objetivos.split("\n").map((objetivo, index) => (
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

// Componente del Formulario Principal
const Formulario = () => {
  const [nivel, setNivel] = useState(null);
  const [temaSeleccionado, setTemaSeleccionado] = useState(null);
  const [preguntas, setPreguntas] = useState([]);
  const [temaInfo, setTemaInfo] = useState({
    descripcion: "",
    objetivos: "",
    conceptosClave: "",
    imagenes: [], // Asegúrate de inicializarlo como un array vacío
  });
  const [mostrarFormularioTema, setMostrarFormularioTema] = useState(false);
  const [tipoPregunta, setTipoPregunta] = useState("opcion_multiple");

  const temasPrincipiante = [
    { id: "1", nombre: "Stock Market Introducción" },
    { id: "2", nombre: "Valuación y Análisis" },
    { id: "3", nombre: "Análisis Técnico" },
    { id: "4", nombre: "Institucional Trading" },
  ];

  const temasIntermedio = [
    { id: "5", nombre: "Estrategias de Inversión" },
    { id: "6", nombre: "Análisis Técnico Avanzado" },
  ];

  const handleNivelSelect = (nivelSeleccionado) => {
    setNivel(nivelSeleccionado);
    setTemaSeleccionado(null);
    setPreguntas([]);
    setTemaInfo(null);
  };

  const handleTemaChange = (e) => {
    const temaId = e.target.value;
    const temas =
      nivel === "principiante" ? temasPrincipiante : temasIntermedio;
    const tema = temas.find((t) => t.id === temaId);
    setTemaSeleccionado(tema);
  };

  const handleTemaInfoSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    setTemaInfo(prevTemaInfo => ({
      ...prevTemaInfo,
      descripcion: formData.get("descripcion") || '',
      objetivos: formData.get("objetivos") || '',
      conceptosClave: formData.get("conceptosClave") || '',
    }));
    
    setMostrarFormularioTema(false);
  };

  const handleSubmitTemaInfo = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    setTemaInfo({
      descripcion: formData.get("descripcion"),
      objetivos: formData.get("objetivos"),
      conceptosClave: formData.get("conceptosClave"),
      imagenes: temaInfo?.imagenes || [],
    });

    setMostrarFormularioTema(false);
  };

  const handleSubmitPregunta = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const nuevaPregunta = {
      numero: preguntas.length + 1,
      tipo: tipoPregunta,
      pregunta: formData.get("pregunta"),
      opciones:
        tipoPregunta === "opcion_multiple"
          ? [
              formData.get("opcion1"),
              formData.get("opcion2"),
              formData.get("opcion3"),
            ]
          : [],
    };

    setPreguntas([...preguntas, nuevaPregunta]);
    e.target.reset();
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Formulario de Cuestionario</h1>

      {/* Selección de nivel */}
      <div className="space-y-4 mb-6">
        <button
          onClick={() => handleNivelSelect("principiante")}
          className={`w-full py-2 px-4 rounded transition-colors ${
            nivel === "principiante"
              ? "bg-blue-600 text-white"
              : "bg-blue-100 text-blue-600 hover:bg-blue-200"
          }`}
        >
          Principiante
        </button>
        <button
          onClick={() => handleNivelSelect("intermedio")}
          className={`w-full py-2 px-4 rounded transition-colors ${
            nivel === "intermedio"
              ? "bg-green-600 text-white"
              : "bg-green-100 text-green-600 hover:bg-green-200"
          }`}
        >
          Intermedio
        </button>
      </div>

      {nivel && (
        <div className="space-y-6">
          {/* Selección de tema */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <label className="block text-gray-700 font-medium mb-2">
              Seleccione un tema
            </label>
            <select
              value={temaSeleccionado?.id || ""}
              onChange={handleTemaChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Seleccione un tema</option>
              {(nivel === "principiante"
                ? temasPrincipiante
                : temasIntermedio
              ).map((tema) => (
                <option key={tema.id} value={tema.id}>
                  {tema.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Formulario de información del tema */}
          {temaSeleccionado && !temaInfo && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Información del Tema</h2>
              <form onSubmit={handleSubmitTemaInfo} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Descripción General
                  </label>
                  <textarea
                    name="descripcion"
                    required
                    className="w-full p-2 border rounded min-h-[100px]"
                    placeholder="Ingrese una descripción general del tema..."
                  />
                </div>

                <ImageUploader
                  images={temaInfo?.imagenes || []}
                  onImageUpload={(images) => {
                    setTemaInfo((prev) => ({ ...prev, imagenes: images }));
                  }}
                  onImageRemove={(index) => {
                    setTemaInfo((prev) => ({
                      ...prev,
                      imagenes: prev.imagenes.filter((_, i) => i !== index),
                    }));
                  }}
                />

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Objetivos de Aprendizaje
                  </label>
                  <textarea
                    name="objetivos"
                    required
                    className="w-full p-2 border rounded min-h-[100px]"
                    placeholder="Ingrese los objetivos de aprendizaje (uno por línea)..."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Conceptos Clave
                  </label>
                  <textarea
                    name="conceptosClave"
                    required
                    className="w-full p-2 border rounded min-h-[100px]"
                    placeholder="Ingrese los conceptos clave del tema..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                >
                  Guardar Información
                </button>
              </form>
            </div>
          )}

          {temaInfo && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Información del Tema</h2>
                <button
                  onClick={() =>
                    setMostrarFormularioTema(!mostrarFormularioTema)
                  }
                  className="text-blue-500 hover:text-blue-600"
                >
                  {mostrarFormularioTema
                    ? "Cancelar Edición"
                    : "Editar Información"}
                </button>
              </div>

              {mostrarFormularioTema ? (
                <form onSubmit={handleSubmitTemaInfo} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Descripción General
                    </label>
                    <textarea
                      name="descripcion"
                      defaultValue={temaInfo.descripcion}
                      required
                      className="w-full p-2 border rounded min-h-[100px]"
                    />
                  </div>

                  <ImageUploader
                    images={temaInfo.imagenes}
                    onImageUpload={(newImages) => {
                      setTemaInfo((prev) => ({
                        ...prev,
                        imagenes: newImages,
                      }));
                    }}
                    onImageRemove={(index) => {
                      setTemaInfo((prev) => ({
                        ...prev,
                        imagenes: prev.imagenes.filter((_, i) => i !== index),
                      }));
                    }}
                  />

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Objetivos de Aprendizaje
                    </label>
                    <textarea
                      name="objetivos"
                      defaultValue={temaInfo.objetivos}
                      required
                      className="w-full p-2 border rounded min-h-[100px]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Conceptos Clave
                    </label>
                    <textarea
                      name="conceptosClave"
                      defaultValue={temaInfo.conceptosClave}
                      required
                      className="w-full p-2 border rounded min-h-[100px]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                  >
                    Actualizar Información
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-700">
                      Descripción General
                    </h3>
                    <p className="text-gray-600 mt-1">{temaInfo.descripcion}</p>
                  </div>

                  {temaInfo.imagenes?.length > 0 && (
                    <div>
                      <h3 className="font-medium text-gray-700">Imágenes</h3>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        {temaInfo.imagenes.map((imagen, index) => (
                          <div key={index} className="border rounded-lg p-2">
                            <img
                              src={imagen.data}
                              alt={imagen.caption}
                              className="max-h-48 mx-auto object-contain"
                            />
                            {imagen.caption && (
                              <p className="text-sm text-gray-500 text-center mt-2">
                                {imagen.caption}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="font-medium text-gray-700">
                      Objetivos de Aprendizaje
                    </h3>
                    {temaInfo.objetivos.split("\n").map((objetivo, index) => (
                      <p key={index} className="text-gray-600 ml-4">
                        • {objetivo}
                      </p>
                    ))}
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700">
                      Conceptos Clave
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {temaInfo.conceptosClave}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {temaInfo && !mostrarFormularioTema && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Agregar Pregunta</h2>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Tipo de Pregunta
                </label>
                <select
                  value={tipoPregunta}
                  onChange={(e) => setTipoPregunta(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="opcion_multiple">Opción Múltiple</option>
                  <option value="parrafo">Pregunta de Párrafo</option>
                </select>
              </div>

              <form onSubmit={handleSubmitPregunta} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Pregunta
                  </label>
                  <textarea
                    name="pregunta"
                    required
                    className="w-full p-2 border rounded"
                    placeholder="Escriba la pregunta..."
                  />
                </div>

                {tipoPregunta === "opcion_multiple" && (
                  <>
                    {[1, 2, 3].map((num) => (
                      <div key={num}>
                        <label className="block text-gray-700 font-medium mb-2">
                          Opción {num}
                        </label>
                        <input
                          type="text"
                          name={`opcion${num}`}
                          required
                          className="w-full p-2 border rounded"
                          placeholder={`Escriba la opción ${num}`}
                        />
                      </div>
                    ))}
                  </>
                )}

                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
                >
                  Agregar Pregunta
                </button>
              </form>
            </div>
          )}

          {preguntas.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Preguntas Agregadas</h2>
              <div className="space-y-4">
                {preguntas.map((pregunta, index) => (
                  <div key={index} className="border p-4 rounded">
                    <h3 className="font-medium mb-2">
                      Pregunta {pregunta.numero}: {pregunta.pregunta}
                    </h3>
                    {pregunta.tipo === "opcion_multiple" ? (
                      <div className="pl-4 space-y-2">
                        {pregunta.opciones.map((opcion, optIndex) => (
                          <div key={optIndex} className="text-gray-600">
                            {optIndex + 1}. {opcion}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="pl-4 text-gray-600 italic">
                        [Pregunta de desarrollo]
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <PDFDownloadLink
                  document={
                    <QuestionsPDF
                      preguntas={preguntas}
                      nivel={nivel}
                      tema={temaSeleccionado}
                      temaInfo={temaInfo}
                    />
                  }
                  fileName={`cuestionario_${nivel}_${temaSeleccionado.nombre
                    .toLowerCase()
                    .replace(/ /g, "_")}.pdf`}
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  {({ loading }) =>
                    loading ? "Generando PDF..." : "Descargar PDF"
                  }
                </PDFDownloadLink>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="text-center mt-6">
        <Link to="/">
          <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors">
            Volver al inicio
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Formulario;
