var jogador = 'X';
var pontosX = 0;
var pontosY = 0;

$( document ).ready(function(){
    $(".velha td").click(function(){
        clicaNoCampo(this);
    })
    $("#btnMensagemOk").click(function(){
        escondeMensagem();
    })
})

function clicaNoCampo(element){
    var campo = $(element);
    if(!campo.hasClass('X') && !campo.hasClass('O')){
        campo.addClass(jogador);
        campo.html(jogador);
        trocaJogador();
    }
    var result = validaJogo();
    if(result != null){
        if(result == 'E')
            exibeMensagem('Teve um empate!');
        else{
            $('.pontos'+result).html(parseInt($('.pontos'+result).html())+1);
            exibeMensagem('O jogador '+result+' venceu!'); 

        }

        limparCampos();
    }
}
function limparCampos(){
    $('.velha').find('td').each(function(){
        $(this).removeClass();
        $(this).html('');
    });
}
function trocaJogador(){
    $('.velha').addClass('bloqueado')
    if(jogador == 'X'){
        jogador = 'O';
        $('.setaJogador').animate({
            left: "+=55"
          }, 500, function() {
            $('.velha').removeClass('bloqueado')
          });
    }
    else{
        jogador = 'X';
        $('.setaJogador').animate({
            left: "-=55"
          }, 500, function() {
            $('.velha').removeClass('bloqueado')
          });
    }
}


function validaJogo(){
    var velha = [];
    var empate = true;
    $('.velha').find('tr').each(function(){
        var linha = [];
        $(this).find('td').each(function(){
            linha.push($(this).html());
            if($(this).html() == '')
                empate = false;
        });
        velha.push(linha);
    });
    if(
        (velha[0][0] != '' && velha[0][0] == velha[0][1] && velha[0][1] == velha[0][2]) ||
        (velha[1][0] != '' && velha[1][0] == velha[1][1] && velha[1][1] == velha[1][2]) ||
        (velha[2][0] != '' && velha[2][0] == velha[2][1] && velha[2][1] == velha[2][2]) ||
        (velha[0][0] != '' && velha[0][0] == velha[1][0] && velha[1][0] == velha[2][0]) ||
        (velha[0][1] != '' && velha[0][1] == velha[1][1] && velha[1][1] == velha[2][1]) ||
        (velha[0][2] != '' && velha[0][2] == velha[1][2] && velha[1][2] == velha[2][2]) ||
        (velha[0][0] != '' && velha[0][0] == velha[1][1] && velha[1][1] == velha[2][2]) ||
        (velha[0][2] != '' && velha[0][2] == velha[1][1] && velha[1][1] == velha[2][0])
    ){
        return jogador == 'X'? 'O':'X';
    }
    if(empate)
        return 'E';
    return null;
}

function exibeMensagem(mensagem){
    $('.mensagem').children('p').html(mensagem);
    $('.caixaJogo').addClass('bloqueado')
    $('.mensagem').show(300)
}
function escondeMensagem(){
    $('.mensagem').hide(300)
    $('.caixaJogo').removeClass('bloqueado')
}
