#!/bin/bash

echo "Implementando en GitHub Pages..."
echo "---------------------------------"

# Asegúrate de estar en la rama principal
git checkout main

# Agregar todos los cambios
git add .

# Solicitar mensaje de commit
echo "Ingresa el mensaje de commit:"
read commit_message

# Realizar el commit
git commit -m "$commit_message"

# Enviar cambios a GitHub
git push origin main

# Mensaje de finalización
echo "---------------------------------"
echo "¡Implementación completada! Tu portafolio debería estar disponible en:"
echo "https://JGD2108.github.io/portafolio-personal/"
echo "---------------------------------"
