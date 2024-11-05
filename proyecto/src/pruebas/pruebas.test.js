// Importa el módulo y pool
const validations = require('./validations');
const pool = require('../../db/db');

const {
    getFinanzas, getFinanzasSemanal, getterFinanzasMensual, gettFinanzasSemestral,
    getUsuariosPorEstatus,
    habilitarUsuario,
    deshabilitarUsuario,
    obtenerGeneraciones,
    crearGeneracion, obtenerUltimaGeneracion, validarNuevaGeneracion
  } = require('./validations');

// Mockea pool.query
jest.mock('../../db/db', () => ({
  query: jest.fn(),
}));

describe('Funciones de Validación - Precios', () => {
    afterEach(() => {
      jest.clearAllMocks(); 
    });
  
    // Pruebas para getPrecios
    test('getPrecios debe retornar todos los precios', async () => {
      const mockResults = [{ id: 1, name: 'Producto 1', price: 100 }];
      pool.query.mockResolvedValue([mockResults]);
  
      const precios = await validations.getPrecios();
      expect(precios).toEqual(mockResults);
    });
  
    test('getPrecios debe retornar un array vacío si no hay precios', async () => {
      pool.query.mockResolvedValue([[]]);
  
      const precios = await validations.getPrecios();
      expect(precios).toEqual([]);
    });
  
    test('getPrecios maneja errores de base de datos correctamente', async () => {
      pool.query.mockRejectedValue(new Error('Error de base de datos'));
  
      await expect(validations.getPrecios()).rejects.toThrow('Error de base de datos');
    });
  
    test('getPrecios debe llamar a pool.query con la consulta correcta', async () => {
      const mockResults = [{ id: 1, name: 'Producto 1', price: 100 }];
      pool.query.mockResolvedValue([mockResults]);
  
      await validations.getPrecios();
      expect(pool.query).toHaveBeenCalledWith('SELECT * FROM precios');
    });
  
    test('getPrecios debe retornar precios con las propiedades id, name y price', async () => {
      const mockResults = [{ id: 1, name: 'Producto 1', price: 100 }];
      pool.query.mockResolvedValue([mockResults]);
  
      const precios = await validations.getPrecios();
      precios.forEach(precio => {
        expect(precio).toHaveProperty('id');
        expect(precio).toHaveProperty('name');
        expect(precio).toHaveProperty('price');
      });
    });
  
    // Pruebas para updatePrecio
    test('updatePrecio debe actualizar el precio correctamente', async () => {
      pool.query.mockResolvedValue([{ affectedRows: 1 }]);
  
      const response = await validations.updatePrecio(1, 200);
      expect(response).toEqual({ message: 'Precio actualizado correctamente' });
    });
  
    test('updatePrecio debe lanzar un error si no se encuentra el producto', async () => {
      pool.query.mockResolvedValue([{ affectedRows: 0 }]);
  
      await expect(validations.updatePrecio(999, 200)).rejects.toThrow('Precio no encontrado');
    });
  
    test('updatePrecio debe lanzar un error si el nuevo precio es negativo', async () => {
      await expect(validations.updatePrecio(1, -50)).rejects.toThrow('Precio no encontrado');
    });
  
    test('updatePrecio debe lanzar un error si ocurre un problema en la base de datos', async () => {
      pool.query.mockRejectedValue(new Error('Error de base de datos'));
  
      await expect(validations.updatePrecio(1, 200)).rejects.toThrow('Error de base de datos');
    });
  
    test('updatePrecio debe llamar a pool.query con los parámetros correctos', async () => {
      pool.query.mockResolvedValue([{ affectedRows: 1 }]);
      const productoId = 1;
      const nuevoPrecio = 200;
  
      await validations.updatePrecio(productoId, nuevoPrecio);
      expect(pool.query).toHaveBeenCalledWith('UPDATE precios SET price = ? WHERE id = ?', [nuevoPrecio, productoId]);
    });
});

// Pruebas unitarias para el módulo de Finanzas
describe('Pruebas Unitarias para el módulo de Finanzas', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('getFinanzas debe devolver todos los registros de finanzas', async () => {
      const mockData = [{ id: 1, metodo_pago: 'Efectivo', monto: 500 }];
      pool.query.mockResolvedValue([mockData]);

      const result = await getFinanzas();
      expect(result).toEqual(mockData);
    });

    test('getFinanzasSemanal debe devolver los registros de la última semana', async () => {
      const mockData = [{ id: 2, metodo_pago: 'Tarjeta', monto: 300 }];
      pool.query.mockResolvedValue([mockData]);

      const result = await getFinanzasSemanal();
      expect(result).toEqual(mockData);
    });

    test('getFinanzasMensual debe devolver los registros del último mes', async () => {
      const mockData = [{ id: 3, metodo_pago: 'Transferencia', monto: 400 }];
      pool.query.mockResolvedValue([mockData]);

      const result = await getterFinanzasMensual();
      expect(result).toEqual(mockData);
    });

    test('getFinanzasSemestral debe devolver los registros del último semestre', async () => {
      const mockData = [{ id: 4, metodo_pago: 'Cheque', monto: 600 }];
      pool.query.mockResolvedValue([mockData]);

      const result = await gettFinanzasSemestral();
      expect(result).toEqual(mockData);
    });

    test('getFinanzas debe manejar una respuesta vacía de la base de datos', async () => {
      pool.query.mockResolvedValue([[]]);

      const result = await getFinanzas();
      expect(result).toEqual([]);
    });

    test('getFinanzasSemanal debe manejar una respuesta vacía de la base de datos', async () => {
      pool.query.mockResolvedValue([[]]);

      const result = await getFinanzasSemanal();
      expect(result).toEqual([]);
    });

    test('getFinanzasMensual debe manejar una respuesta vacía de la base de datos', async () => {
      pool.query.mockResolvedValue([[]]);

      const result = await getterFinanzasMensual();
      expect(result).toEqual([]);
    });

    test('getFinanzasSemestral debe manejar una respuesta vacía de la base de datos', async () => {
      pool.query.mockResolvedValue([[]]);

      const result = await gettFinanzasSemestral();
      expect(result).toEqual([]);
    });

    test('getFinanzas debe lanzar un error si la consulta falla', async () => {
      pool.query.mockRejectedValue(new Error('Database error'));

      await expect(getFinanzas()).rejects.toThrow('Database error');
    });

    test('getFinanzasSemanal debe lanzar un error si la consulta falla', async () => {
      pool.query.mockRejectedValue(new Error('Database error'));

      await expect(getFinanzasSemanal()).rejects.toThrow('Database error');
    });

    test('getFinanzasMensual debe lanzar un error si la consulta falla', async () =>{
        pool.query.mockRejectedValue(new Error('Database error'));

        await expect(getterFinanzasMensual()).rejects.toThrow('Database error');
    });

    test('getFinanzasSemestral debe lanzar un error si la consulta falla', async () =>{
        pool.query.mockRejectedValue(new Error('Database error'));

        await expect(gettFinanzasSemestral()).rejects.toThrow('Database error');
    });
});

describe('Pruebas para el módulo de alumnos y obtención de usuarios', () => {
    afterEach(() => {
      jest.clearAllMocks(); 
    });
  
    test('debe retornar una lista de usuarios del tipo especificado', async () => {
        const mockResults = [
          { id: 1, nombre: 'Juan', tipo: 'AV' },
          { id: 2, nombre: 'Maria', tipo: 'AV' },
        ];
        pool.query.mockResolvedValue([mockResults]);
    
        const usuarios = await validations.getUsuariosPorTipo('AV');
        expect(usuarios).toEqual(mockResults);
      });
    
      test('debe retornar una lista vacía si no hay usuarios del tipo especificado', async () => {
        pool.query.mockResolvedValue([[]]);
    
        const usuarios = await validations.getUsuariosPorTipo('P');
        expect(usuarios).toEqual([]);
      });
    
      test('debe manejar un error si el tipo especificado no existe en la base de datos', async () => {
        pool.query.mockRejectedValue(new Error('Tipo no encontrado'));
    
        await expect(validations.getUsuariosPorTipo('XYZ')).rejects.toThrow('Tipo no encontrado');
      });
    
      test('debe lanzar un error si ocurre un problema en la base de datos', async () => {
        pool.query.mockRejectedValue(new Error('Error de base de datos'));
    
        await expect(validations.getUsuariosPorTipo('adm')).rejects.toThrow('Error de base de datos');
      });        
    
      test('debe retornar usuarios con propiedades id, nombre y tipo', async () => {
        const mockResults = [{ id: 1, nombre: 'Luis', tipo: 'P' }];
        pool.query.mockResolvedValue([mockResults]);
    
        const usuarios = await validations.getUsuariosPorTipo('P');
        expect(usuarios[0]).toHaveProperty('id');
        expect(usuarios[0]).toHaveProperty('nombre');
        expect(usuarios[0]).toHaveProperty('tipo');
      });
    
      test('debe manejar correctamente una entrada vacía para el tipo', async () => {
        await expect(validations.getUsuariosPorTipo('')).rejects.toThrow('Tipo no puede estar vacío, null o undefined');
      });
    
      test('debe lanzar un error si el tipo es null o undefined', async () => {
        await expect(validations.getUsuariosPorTipo(null)).rejects.toThrow('Tipo no puede estar vacío, null o undefined');
        await expect(validations.getUsuariosPorTipo(undefined)).rejects.toThrow('Tipo no puede estar vacío, null o undefined');
    });
});

describe('Pruebas para getUsuariosPorEstatus', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('1. Debe retornar usuarios con estatus válido', async () => {
      const mockUsuarios = [{ ID_Usuario: 1, Correo: 'test@example.com', Tipo: 'AV', fecha_creacion: '2023-10-01', Nombres: 'Juan', ApellidoPaterno: 'Perez', ApellidoMaterno: 'Lopez' }];
      pool.query.mockResolvedValueOnce([mockUsuarios]);
  
      const response = await getUsuariosPorEstatus('Habilitado');
      expect(response.data).toEqual(mockUsuarios);
      expect(response.status).toBe(200);
    });
  
    test('2. Debe retornar código de estado 200 con usuarios encontrados', async () => {
      const mockUsuarios = [{ ID_Usuario: 2, Correo: 'test2@example.com', Tipo: 'P', fecha_creacion: '2023-10-02', Nombres: 'Ana', ApellidoPaterno: 'Gomez', ApellidoMaterno: 'Sanchez' }];
      pool.query.mockResolvedValueOnce([mockUsuarios]);
  
      const response = await getUsuariosPorEstatus('Habilitado');
      expect(response.status).toBe(200);
    });
  
    test('3. Debe retornar mensaje de error con estatus inexistente', async () => {
      pool.query.mockResolvedValueOnce([[]]);
  
      const response = await getUsuariosPorEstatus('Inexistente');
      expect(response.error).toBe('No se encontraron usuarios para este estatus');
      expect(response.status).toBe(404);
    });
  
    test('4. Debe retornar código de estado 404 si no hay usuarios con el estatus dado', async () => {
      pool.query.mockResolvedValueOnce([[]]);
  
      const response = await getUsuariosPorEstatus('Deshabilitado');
      expect(response.status).toBe(404);
    });
  
    test('5. Debe manejar error de conexión con la base de datos', async () => {
      pool.query.mockRejectedValueOnce(new Error('Error de conexión'));
  
      const response = await getUsuariosPorEstatus('Habilitado');
      expect(response.error).toBe('Error al obtener los usuarios');
      expect(response.status).toBe(500);
    });
  
    test('6. Debe retornar usuarios con propiedades específicas', async () => {
      const mockUsuarios = [{ ID_Usuario: 3, Correo: 'test3@example.com', Tipo: 'adm', fecha_creacion: '2023-10-03', Nombres: 'Maria', ApellidoPaterno: 'Lopez', ApellidoMaterno: 'Garcia' }];
      pool.query.mockResolvedValueOnce([mockUsuarios]);
  
      const response = await getUsuariosPorEstatus('Habilitado');
      const user = response.data[0];
      expect(user).toHaveProperty('ID_Usuario');
      expect(user).toHaveProperty('Correo');
      expect(user).toHaveProperty('Tipo');
      expect(user).toHaveProperty('fecha_creacion');
      expect(user).toHaveProperty('Nombres');
      expect(user).toHaveProperty('ApellidoPaterno');
      expect(user).toHaveProperty('ApellidoMaterno');
    });
  
    test('7. Debe manejar correctamente estatus nulo o indefinido', async () => {
      pool.query.mockResolvedValueOnce([[]]);
  
      const response = await getUsuariosPorEstatus(null);
      expect(response.error).toBe('No se encontraron usuarios para este estatus');
      expect(response.status).toBe(404);
    });
  });
  
  describe('Pruebas para habilitarUsuario', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('8. Debe habilitar usuario con ID válido', async () => {
      pool.query.mockResolvedValueOnce([{ affectedRows: 1 }]);
  
      const response = await habilitarUsuario(1);
      expect(response.message).toBe('Usuario habilitado correctamente');
      expect(response.status).toBe(200);
    });
  
    test('9. Debe retornar código de estado 200 al habilitar usuario existente', async () => {
      pool.query.mockResolvedValueOnce([{ affectedRows: 1 }]);
  
      const response = await habilitarUsuario(2);
      expect(response.status).toBe(200);
    });
  
    test('10. Debe manejar ID de usuario inexistente', async () => {
      pool.query.mockResolvedValueOnce([{ affectedRows: 0 }]);
  
      const response = await habilitarUsuario(999);
      expect(response.error).toBe('Usuario no encontrado');
      expect(response.status).toBe(404);
    });
  
    test('11. Debe retornar código de estado 404 si el ID no existe', async () => {
      pool.query.mockResolvedValueOnce([{ affectedRows: 0 }]);
  
      const response = await habilitarUsuario(999);
      expect(response.status).toBe(404);
    });
  
    test('12. Debe manejar error de conexión con la base de datos al habilitar usuario', async () => {
      pool.query.mockRejectedValueOnce(new Error('Error de conexión'));
  
      const response = await habilitarUsuario(1);
      expect(response.error).toBe('Error al habilitar usuario');
      expect(response.status).toBe(500);
    });
  });
  
  describe('Pruebas para deshabilitarUsuario', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('13. Debe deshabilitar usuario con ID válido', async () => {
      pool.query.mockResolvedValueOnce([{ affectedRows: 1 }]);
  
      const response = await deshabilitarUsuario(1);
      expect(response.message).toBe('Usuario deshabilitado correctamente');
      expect(response.status).toBe(200);
    });
  
    test('14. Debe retornar código de estado 200 al deshabilitar usuario existente', async () => {
      pool.query.mockResolvedValueOnce([{ affectedRows: 1 }]);
  
      const response = await deshabilitarUsuario(2);
      expect(response.status).toBe(200);
    });
  
    test('15. Debe manejar ID de usuario inexistente al deshabilitar', async () => {
      pool.query.mockResolvedValueOnce([{ affectedRows: 0 }]);
  
      const response = await deshabilitarUsuario(999);
      expect(response.error).toBe('Usuario no encontrado');
      expect(response.status).toBe(404);
    });
  });

  describe('Pruebas para obtenerGeneraciones', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('1. Debe obtener generaciones correctamente', async () => {
      const mockResult = [{ Nombre_Gen: 'A' }, { Nombre_Gen: 'B' }];
      pool.query.mockResolvedValueOnce([mockResult]);
  
      const response = await obtenerGeneraciones();
      expect(response.data).toEqual(mockResult);
      expect(response.status).toBe(200);
    });
  
    test('2. Debe manejar error al obtener generaciones', async () => {
      pool.query.mockRejectedValueOnce(new Error('Error de conexión'));
  
      const response = await obtenerGeneraciones();
      expect(response.error).toBe('Error al obtener generaciones');
      expect(response.status).toBe(500);
    });
  });
  
  describe('Pruebas para crearGeneracion', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('3. Debe crear generación con alumnos entre 8 y 32', async () => {
      pool.query.mockResolvedValueOnce([{}]);
  
      const response = await crearGeneracion('A', 1, Array(10).fill(1));
      expect(response.message).toBe('Generación creada exitosamente');
      expect(response.status).toBe(200);
    });
  
    test('4. Debe retornar error si hay menos de 8 alumnos', async () => {
      const response = await crearGeneracion('B', 1, Array(5).fill(1));
      expect(response.error).toBe('La generación debe tener entre 8 y 32 alumnos.');
      expect(response.status).toBe(400);
    });
  
    test('5. Debe retornar error si hay más de 32 alumnos', async () => {
      const response = await crearGeneracion('C', 1, Array(35).fill(1));
      expect(response.error).toBe('La generación debe tener entre 8 y 32 alumnos.');
      expect(response.status).toBe(400);
    });
  
    test('6. Debe manejar error al crear generación', async () => {
      pool.query.mockRejectedValueOnce(new Error('Error de conexión'));
  
      const response = await crearGeneracion('D', 1, Array(10).fill(1));
      expect(response.error).toBe('Error al crear la generación');
      expect(response.status).toBe(500);
    });
  });
  
  describe('Pruebas para obtenerUltimaGeneracion', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('7. Debe obtener el nombre de la última generación correctamente', async () => {
      pool.query.mockResolvedValueOnce([[{ Nombre_Gen: 'Z' }]]);
  
      const nombreGeneracion = await obtenerUltimaGeneracion();
      expect(nombreGeneracion).toBe('Z');
    });
  
    test('8. Debe retornar null si no existen generaciones previas', async () => {
      pool.query.mockResolvedValueOnce([[]]);
  
      const nombreGeneracion = await obtenerUltimaGeneracion();
      expect(nombreGeneracion).toBeNull();
    });
  
    test('9. Debe manejar error al obtener la última generación', async () => {
      pool.query.mockRejectedValueOnce(new Error('Error de conexión'));
  
      await expect(obtenerUltimaGeneracion()).rejects.toThrow('Error de conexión');
    });
  });
  
  describe('Pruebas para validarNuevaGeneracion', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('10. Debe retornar "A" si no hay generación previa', async () => {
      pool.query.mockResolvedValueOnce([[]]);
  
      const siguienteGeneracion = await validarNuevaGeneracion();
      expect(siguienteGeneracion).toBe('A');
    });
  
    test('11. Debe retornar la siguiente letra en orden alfabético', async () => {
      pool.query.mockResolvedValueOnce([[{ Nombre_Gen: 'A' }]]);
  
      const siguienteGeneracion = await validarNuevaGeneracion();
      expect(siguienteGeneracion).toBe('B');
    });
  
    test('12. Debe regresar a "A" después de "Z"', async () => {
      pool.query.mockResolvedValueOnce([[{ Nombre_Gen: 'Z' }]]);
  
      const siguienteGeneracion = await validarNuevaGeneracion();
      expect(siguienteGeneracion).toBe('A');
    });
  
    test('13. Debe manejar el error de conexión en la validación de generación', async () => {
      pool.query.mockRejectedValueOnce(new Error('Error de conexión'));
  
      await expect(validarNuevaGeneracion()).rejects.toThrow('Error de conexión');
    });
  
    test('14. Debe validar generación con nombre de varias letras comenzando con "C"', async () => {
      pool.query.mockResolvedValueOnce([[{ Nombre_Gen: 'C1' }]]);
  
      const siguienteGeneracion = await validarNuevaGeneracion();
      expect(siguienteGeneracion).toBe('D');
    });
  
    test('15. Validar si el orden alfabético continúa tras "G"', async () => {
      pool.query.mockResolvedValueOnce([[{ Nombre_Gen: 'G' }]]);
  
      const siguienteGeneracion = await validarNuevaGeneracion();
      expect(siguienteGeneracion).toBe('H');
    });
  
    test('16. Validar creación después de generación compleja "XYZ"', async () => {
      pool.query.mockResolvedValueOnce([[{ Nombre_Gen: 'XYZ' }]]);
  
      const siguienteGeneracion = await validarNuevaGeneracion();
      expect(siguienteGeneracion).toBe('Y');
    });
  });

