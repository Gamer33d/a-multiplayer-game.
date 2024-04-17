# Um jogo multiplayer. 
Este jogo foi proposto pelo criador de conteudo e programador
Filipe Deschamps, onde, em seu canal, foi postado 12 videos explicando
os principais conceitos e toda a aplicação em si. Eu apenas implementei algumas
ideias que ele propos, refatorei algumas linhas e deixei o codigo a minha "cara".


## Conceitos.

### As quatro responsabilidades (separation of concerns) 

#### Apresentação

Igual a uma impressora, so serve
para imprimir a parte visual

#### Logica + Dados

Aqui ficara todas as informações do jogo (variaveis de localização e etc)
e todas as regras de négocio.

Ela é abstrada, o que fica responsavel por mostrar
é a camada primaria

#### Inputs

Responsavel por pegar todos os inputs do usuario e trata-los

#### Networking

Responsavel por sincronizar todos os clients
com o server, e transitar todos os dados necessarios entre **server -> client** e **client -> server**


## Nexts Steps
- [x] Reajustar o canvas com o valor abstrado do server
- [x] Fazer o unsubscribe de observers ao deslogar
- [x] Fazer o jogador dar a volta no canvas, invez de proibir a passagem atraves da parede
- [x] Sistema de pontuação
- [x] Emitir sons (a cada ponto e ao chegar em 100 pontos)

## Referencias
[Repositório principal](https://github.com/filipedeschamps/meu-primeiro-jogo-multiplayer)\
[Canal do Filipe Deschamps](https://www.youtube.com/@FilipeDeschamps)
