import fs from 'fs/promises'
import path from 'path'

async function generateComponent(componentName) {
  const componentPath = path.join('src', 'components/', componentName)

  // Crea la carpeta del componente
  await fs.mkdir(componentPath)

  // Crea el archivo JSX del componente
  await fs.writeFile(
    path.join(componentPath, `${componentName}.jsx`),
    `import React from 'react'

const ${componentName} = () => (
  <div className="${componentName.toLowerCase()}">
    {/* Contenido del componente */}
  </div>
)

export default ${componentName}
`,
  )

  // Crea el archivo index.js que importa el componente
  await fs.writeFile(
    path.join(componentPath, 'index.js'),
    `import ${componentName} from './${componentName}'

export default ${componentName}
`,
  )

  // Crea el archivo SCSS
  await fs.writeFile(
    path.join(componentPath, `${componentName}.scss`),
    '',
  )

  console.log(`Componente ${componentName} creado en ${componentPath}`)
}

// Obtén el nombre del componente desde la línea de comandos
const componentName = process.argv[2]

if (!componentName) {
  console.error('Por favor, proporciona un nombre para el componente.')
} else {
  generateComponent(componentName)
}
