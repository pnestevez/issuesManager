# issuesManager

Issues Manager es una aplicación web responsive realizada en React con el framework Next.js, que cuenta con una API REST confeccionada con Node.js para el almacenamiento y la consulta de información en una base de datos relacional de SQLite.

En este desarrollo utilicé estrategias de server side rendering y stale-while-revalidate (SWR, de Vercel), en tareas data fetching y mutación, con un intervalo de actualización de datos del lado del cliente cada 5 minutos, que -por supuesto- podría modificarse en las variables de ambiente. Asimismo, llevé adelante una estrategia de passwordless authentication, a través de Magic Link. Y para la carga de imágenes, Cloudinary.

El repositorio issuesManager contiene los directorios /issues-core e /issues-ui, que alojan respectivamente la API y la user interface. Para su puesta en marcha deberá correr los siguientes comandos en su consola:

    0. 'brew install sqlite3', o bien mediante https://www.sqlite.org/download.html, en caso de que no cuente con Homebrew.
    1. ‘git clone https://github.com/pnestevez/issuesManager.git'
    en /issuesManager/issues-core
    2.1. ‘npm install’
    2.2. 'npm start'
    en /issuesManager/issues-ui
    3.1 ‘npm install’
    3.2. 'npm start'

La UI corre en el puerto 3000, en tanto que la API lo hace en el 4000.
Utilicé ESLint para darle estilo al código, con el formato de Airbnb.
