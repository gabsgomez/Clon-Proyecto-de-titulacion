import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ImageUploader from "./ImageUploader";
import QuestionsPDF from "./PdfConverter";

const Formulario = () => {
  const [nivel, setNivel] = useState(null);
  const [temaSeleccionado, setTemaSeleccionado] = useState(null);
  const [preguntas, setPreguntas] = useState([]);
  const [temaInfo, setTemaInfo] = useState({
    descripcion: "",
    objetivos: "",
    conceptosClave: "",
    imagenes: [],
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
    setTemaInfo({
      descripcion: "",
      objetivos: "",
      conceptosClave: "",
      imagenes: [],
    });
  };

  const handleTemaChange = (e) => {
    const temaId = e.target.value;
    const temas = nivel === "principiante" ? temasPrincipiante : temasIntermedio;
    const tema = temas.find((t) => t.id === temaId);
    setTemaSeleccionado(tema);
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
          {temaSeleccionado && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {mostrarFormularioTema ? "Editar" : "Información del"} Tema
                </h2>
                {!mostrarFormularioTema && temaInfo.descripcion && (
                  <button
                    onClick={() => setMostrarFormularioTema(true)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Editar Información
                  </button>
                )}
              </div>

              {(mostrarFormularioTema || !temaInfo.descripcion) ? (
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
                      placeholder="Ingrese un objetivo por línea..."
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
                    {mostrarFormularioTema ? "Actualizar" : "Guardar"} Información
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
                    {temaInfo.objetivos?.split("\n").map((objetivo, index) => (
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

          {/* Formulario de preguntas */}
          {temaInfo.descripcion && !mostrarFormularioTema && (
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

          {/* Lista de preguntas y generación de PDF */}
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