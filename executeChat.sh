#!/bin/bash

# Establece fecha de inicio de ejecicion
echo "`date +"%d/%m/%Y"` `date +"%H:%M:%S"` ### Inicia ejecución de scritp para levantar proyecto"
eval `ssh-agent -s`
ssh-add /home/testing/.ssh/keyname

echo "`date +"%d/%m/%Y"` `date +"%H:%M:%S"` : Descargamos repositorio"
git stash
git pull origin main
git stash apply stash@{0}
git stash drop stash@{0}

echo "`date +"%d/%m/%Y"` `date +"%H:%M:%S"` ### Cambia permisos de ejecucion en archivos sh"
chmod +x executeChat.sh

echo "`date +"%d/%m/%Y"` `date +"%H:%M:%S"` : Ejecutamos docker-compose y luego de ejecución limpiarmos el contenedor"
docker-compose -f docker-compose.yml up --remove-orphans
docker-compose -f docker-compose.yml rm -f 

LABEL="\"chatGenus.tempData=builder\""
echo "`date +"%d/%m/%Y"` `date +"%H:%M:%S"` : Ejecutamos docker-compose node"
docker build --force-rm -t images:dev . --no-cache --progress plain --label "$LABEL"


echo "`date +"%d/%m/%Y"` `date +"%H:%M:%S"` : Eliminamos datos de build de memoria"
docker image prune --filter label=$LABEL -f

echo "`date +"%d/%m/%Y"` `date +"%H:%M:%S"` : Actualizamos contenedores"
cd /opt/genus/genusV2/Genus.Infrastructure
docker-compose -f docker-compose.infrastructure.yml up -d --force-recreate namecontainer
