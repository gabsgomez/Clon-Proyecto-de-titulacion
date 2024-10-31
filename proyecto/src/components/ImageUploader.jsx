import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUploader = ({ images = [], onImageUpload, onImageRemove }) => {
  const [error, setError] = useState(null);
  const imageArray = Array.isArray(images) ? images : [];

  const onDrop = useCallback(acceptedFiles => {
    setError(null);
    Promise.all(
      acceptedFiles.map(file => {
        return new Promise((resolve, reject) => {
          if (!file.type.startsWith('image/')) {
            reject(new Error(`${file.name} no es una imagen válida`));
            return;
          }

          const reader = new FileReader();
          reader.onabort = () => reject(new Error(`La lectura del archivo ${file.name} fue abortada`));
          reader.onerror = () => reject(new Error(`Error al leer el archivo ${file.name}`));
          reader.onloadend = () => {
            resolve({
              data: reader.result,
              caption: '',
              title: file.name,
              size: file.size,
              type: file.type
            });
          };
          reader.readAsDataURL(file);
        });
      })
    )
    .then(newImages => {
      onImageUpload([...imageArray, ...newImages]);
    })
    .catch(err => {
      setError(err.message);
      console.error('Error al procesar las imágenes:', err);
    });
  }, [imageArray, onImageUpload]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']
    },
    maxSize: 5242880,
    maxFiles: 5,
  });

  return (
    <div className="space-y-6">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
      >
        <input {...getInputProps()} />
        <div className="space-y-2">
          <div className="text-4xl text-gray-400">📸</div>
          <p className="text-gray-600">
            {isDragActive ? "Suelta las imágenes aquí" : "Arrastra y suelta imágenes aquí, o haz clic para seleccionar"}
          </p>
          <p className="text-sm text-gray-500">
            Formatos permitidos: JPG, PNG, GIF | Máximo 5MB por archivo
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {imageArray.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-700">
              Imágenes cargadas ({imageArray.length})
            </h3>
            <button
              onClick={() => onImageUpload([])}
              className="text-red-500 hover:text-red-600 text-sm"
            >
              Eliminar todas
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {imageArray.map((image, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <img
                  src={image.data}
                  alt={image.title}
                  className="max-h-48 w-full object-contain"
                />
                <input
                  type="text"
                  value={image.caption || ''}
                  onChange={(e) => {
                    const newImages = [...imageArray];
                    newImages[index].caption = e.target.value;
                    onImageUpload(newImages);
                  }}
                  placeholder="Agregar descripción..."
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={() => onImageRemove(index)}
                  className="text-red-500 hover:text-red-600 text-sm"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;