# Weather APP

Aplicativo para exibir informações sobre o tempo na região na qual o dispositivo se encontra.

Para isso utiliza as coordenadas _(é necessário permissão para acessar a localização do usuário)_, com esses dados é possível fazer uma requisição a [OpenWeather](https://openweathermap.org/api) para recuperar os dados do tempo atual.

![Home Screen](./docs/screenshot.png)

## Instalação e configuração

A instalação e configuração do app é muito simples.

```shell
# Clone o projeto
$ git clone https://github.com/juakacc/weather-app.git
$ cd weather-app
```

```shell
# Instale as dependências
$ npm i
```

_Para executar o projeto localmente é necessário ter um emulador instalado ou um smartphone configurado para debug_

```shell
# Inicie o servidor
$ npx react-native start
# Execute o projeto
$ npx react-native run-android
```

## Contribuições

Sinta-se a vontade para contribuir. :)
