# (Frontend Mentor) Mood Tracker 🧠🌙

Aplicação web para registrar e acompanhar o humor, sono e emoções diárias. Os usuários podem criar uma conta, fazer check-ins diários e visualizar tendências do seu bem-estar ao longo do tempo.

## 🚀 Funcionalidades

- Registro e login de usuário
- Nome e foto personalizáveis por usuário
- Registro de humor e sono diário
- Gráfico visual que fornece ao usuário informações sobre os últimos 11 registros feitos
- Campo que mostra a "média" do humor dos últimos 5 registros (ver abaixo a explicação de como eu tratei a média de humor)
- Campo que mostra a média de sono dos últimos 5 registros

## 🧮 Cálculo

- Na parte da média do humor se eu calculasse a média de maneira mátematica o comportamento seria o seguinte: no caso de 3 "very happy" e 2 "neutral" a média seria happy... porém não gostei desse comportamento pois no gráfico não teria nenhum happy e o usuario não teria escolhido nenhum happy mas mesmo assim o average mood seria happy. Então eu decidi fazer da seguinte forma: se um humor repetir mais do que os outros ele será o escolhido, se o usuário escolher um de cada o escolhido será "neutral" e por último se houver empate de 2 2 o humor será definido com base no outro humor exemplo: 2 very happy 2 neutral e 1 happy o humor escolhido será very happy pois o happy puxa mais pro "very happy" do que pro "neutral".

- Na parte das datas do gráfico eu pego os registros e ordeno a sequencia das datas e quando acaba os registros preencho até completar 11 com as datas anteriores da data do registro mais antigo e caso o usuário não tenha nenhum registro coloco a data atual e vou preenchendo com as datas anteriores até completar os 11.

## 📸 Screenshots

![Registros vazios e sem registro diário](./public/empty-screenshot.PNG)
![Alguns registros e com registro diário](./public/fullloged-screenshot.PNG)
