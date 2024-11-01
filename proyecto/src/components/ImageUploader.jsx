import React, { useState, useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";

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

      {(error || fileRejections.length > 0) && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600 font-medium">Se encontraron errores:</p>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {fileRejections.length > 0 && (
            <ul className="list-disc list-inside mt-2">{fileRejectionItems}</ul>
          )}
        </div>
      )}

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

export default ImageUploader;