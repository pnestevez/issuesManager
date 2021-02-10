# issuesManager

Issues Manager es una aplicación web responsive realizada en React con el framework Next.js, que cuenta con una API REST confeccionada con Node.js para el almacenamiento y la consulta de información en una base de datos relacional de SQLite.

En este desarrollo utilicé estrategias de server side rendering y stale-while-revalidate (SWR, de Vercel), en tareas data fetching y mutación, con un intervalo de actualización de datos del lado del cliente cada 5 minutos, que -por supuesto- podría modificarse en las variables de ambiente. Asimismo, llevé adelante una estrategia de passwordless authentication, a través de Magic Link. Y para la carga de imágenes, Cloudinary.

El repositorio issuesManager contiene los directorios /issues-core e /issues-ui, que alojan respectivamente la API y la user interface.

Utilicé ESLint para darle estilo al código, con el formato de Airbnb.

**Nota:** en caso de que el proyecto sea consumido masivamente, considero que sería adecuado paginar el servicio de issues de la API. Por otro lado, sería prudente ampliar la cobertura de tests. Estos se encuentran disponibles en /issuesManager/issues-core/test y pueden ser ejecutados con el comando ‘npm run test’, en el directorio /issuesManager/issues-core.

## Setup

0- Instalar SQLite (o bien, mediante https://www.sqlite.org/download.html, en caso de que no cuente con Homebrew)

    % brew install sqlite3 

1- Clonar el repositorio

    % git clone https://github.com/pnestevez/issuesManager.git

2- Instalar las dependencias

en /issuesManager/issues-core

    % npm install
    % npm start
    
en /issuesManager/issues-ui

    % npm install
    % npm start

La UI corre en el puerto 3000, en tanto que la API lo hace en el 4000.
