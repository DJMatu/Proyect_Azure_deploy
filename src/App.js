// import React from 'react';
// import UI from './components/UI';

// function App() {
//   return (
//     <>
//     <UI />
    
//     </>
    
//   );
// }

// export default App;


// App.js
import React, { useState } from 'react';
import UI from './components/UI'; // Suponiendo que UI.js es tu componente
import analyzeImage from './azure-image-analysis';

function App() {
  const [resultadosAnalisis, setResultadoAnalisis] = useState(null);
  const [cargando, setCargando] = useState(false);

  const manejarAnalisisImagen = async (imageUrl) => {
    try {
      setCargando(true);
      const resultados = await analyzeImage(imageUrl);
      setResultadoAnalisis(resultados);
    } finally {
      setCargando(false);
    }
  };

  const mostrarResultados = () => {
    if (cargando) {
      return <p>Cargando...</p>;
    }
  
    if (resultadosAnalisis && resultadosAnalisis.description && resultadosAnalisis.description.captions && resultadosAnalisis.description.captions.length > 0) {
      // Mostrar resultados en un formato legible
      return (
        <div>
          <p>URL de la imagen: {resultadosAnalisis.metadata.url}</p>
          <p>Descripción: {resultadosAnalisis.description.captions[0].text}</p>
          {/* Agrega más detalles según sea necesario */}
        </div>
      );
    } else {
      return <p>No se encontraron resultados válidos.</p>;
    }
  };
  

  return (
    <div>
      <UI onAnalyze={manejarAnalisisImagen} />
      <button onClick={() => manejarAnalisisImagen('./img/barca.jpg')}>
        Analizar Imagen
      </button>


      {mostrarResultados()}
    </div>
  );
}

export default App;
