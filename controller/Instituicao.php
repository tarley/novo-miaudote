<?php
error_reporting(0);
ini_set("display_errors", 0);

require_once "../enum/EnumInstituicao.php";

class Instituicao{
    public function CriarInstituicao($p_NomeInstituicao, $p_Telefone, $p_Email, $p_TipoInstituicao, $p_Cidade){
        require_once "Conexao.php";
        $erro = false;
        $mensagem = null;
        
        if(empty($p_NomeInstituicao)){
            $erro = true;
            $mensagem = ERRO_NOME_INSTITUICAO;
        }elseif(empty($p_Telefone)){
            $erro = true;
            $mensagem = NUM_TELEFONE;
        }elseif(empty($p_Email)){
            $erro = true;
            $mensagem = ERRO_EMAIL_OBRIGATORIO;
        }elseif(empty($p_TipoInstituicao)){
            $erro = true;
            $mensagem = ERRO_TIPO_OBRIGATORIO;
        }
        
        if($erro){
            return array("sucesso"=>false,
            "mensagem"=>$mensagem);
        }
        
        try{
            $excluida = InstituicaoNaoExcluida;
            $stmt = $conn->prepare("INSERT INTO `miaudote`.`INSTITUICAO` (`NOM_INSTITUICAO`, `NUM_TELEFONE`, `IND_TIPO_INSTITUICAO`, `DES_EMAIL`, `IND_EXCLUIDO`, `CIDADE_COD_CIDADE`) VALUES (:nome, :telefone, :tipo, :email, :excluido, :cidade)");
            $stmt->bindParam(':nome', $p_NomeInstituicao);
            $stmt->bindParam(':telefone', $p_Telefone);
            $stmt->bindParam(':tipo', $p_TipoInstituicao);
            $stmt->bindParam(':email', $p_Email);
            $stmt->bindParam(':excluido', $excluida);
            $stmt->bindParam(':cidade', $p_Cidade);
            $stmt->execute();
            
            return array("mensagem" => SUCESSO_INSTITUICAO_CADASTRADA,
                        "sucesso" => true);
        }catch(Exception $ex){
            return array("mensagem" => ERRO_INSTITUICAO_CADASTRADA,
                        "sucesso" => false);
        }
        
        $conn = null;
    }
    
    public function ExcluirInstituicao($p_InstituicaoPK){
        require_once "Conexao.php";
        
        try{
            $excluida = InstituicaoExcluida;
            $stmt = $conn->prepare("UPDATE  `miaudote`.`INSTITUICAO` SET  `IND_EXCLUIDO` =  :excluido WHERE  `INSTITUICAO`.`COD_INSTITUICAO` = :CodInstituicao");
            $stmt->bindParam(':excluido', $excluida);
            $stmt->bindParam(':CodInstituicao', $p_InstituicaoPK);
            $stmt->execute();
            
            return array("mensagem" => SUCESSO_INSTITUICAO_EXCLUIDA,
                        "sucesso" => true);
        }catch(Exception $ex){
            return array("mensagem" => ERRO_INSTITUICAO_EXCLUIDA,
                        "sucesso" => false);
        }
        $conn = null;
    }
    
    public function AlterarInstituicao($p_InstituicaoPK, $p_NomeInstituicao, $p_Telefone, $p_Email, $p_TipoInstituicao){
        require_once "Conexao.php";

        $erro = false;
        $mensagem = null;
        
        if(empty($p_NomeInstituicao)){
            $erro = true;
            $mensagem = ERRO_NOME_INSTITUICAO;
        }elseif(empty($p_Telefone)){
            $erro = true;
            $mensagem = NUM_TELEFONE;
        }elseif(empty($p_Email)){
            $erro = true;
            $mensagem = ERRO_EMAIL_OBRIGATORIO;
        }elseif(empty($p_TipoInstituicao)){
            $erro = true;
            $mensagem = ERRO_TIPO_OBRIGATORIO;
        }elseif(empty($p_InstituicaoPK)){
            $erro = true;
            $mensagem = ERRO_COD_INSTITUICAO;
        }
        
        if($erro){
            return array("sucesso"=>false,
            "mensagem"=>$mensagem);
        }
        
        try{
            $excluida = InstituicaoExcluida;
            $stmt = $conn->prepare("
            UPDATE `miaudote`.`INSTITUICAO` SET `NOM_INSTITUICAO` = :nome,
            `NUM_TELEFONE` = :telefone,
            `IND_TIPO_INSTITUICAO` = :tipo,
            `DES_EMAIL` = :email 
            WHERE `INSTITUICAO`.`COD_INSTITUICAO` = :CodInstituicao");
            
            $stmt->bindParam(':CodInstituicao', $p_InstituicaoPK);
            $stmt->bindParam(':nome', $p_NomeInstituicao);
            $stmt->bindParam(':telefone', $p_Telefone);
            $stmt->bindParam(':tipo', $p_TipoInstituicao);
            $stmt->bindParam(':email', $p_Email);
            $stmt->execute();
            
            return array("sucesso"=>true,
                "mensagem"=>SUCESSO_ALTERACAO_INSTITUICAO);
        }catch(Exception $ex){
            return array("sucesso"=>false,
            "mensagem"=>ERRO_ALTERACAO_INSTITUICAO);
        }
        $conn = null;
    }
    
     public function GetInstituicao($p_Pagina){
        require_once "Conexao.php";
        $QTD_Exibida = 5; 
        
        if(empty($p_Pagina) || $p_Pagina < 1){
            $p_Pagina = 1;
        }
        
        
        $stmt = $conn->prepare("SELECT COUNT(COD_INSTITUICAO) AS QTD_INSTITUICAO FROM INSTITUICAO WHERE IND_EXCLUIDO='N' "); 
        $stmt->execute();
        
       while($row = $stmt->fetch(PDO::FETCH_OBJ)){
           $QTD_Instituicao = $row->QTD_INSTITUICAO;
       }
       
        $Num_Paginas = ceil($QTD_Instituicao/$QTD_Exibida); 
        
        $inicio = ($QTD_Exibida*$p_Pagina)-$QTD_Exibida; 
        $excluido = InstituicaoNaoExcluida;
        $stmt = $conn->prepare("SELECT INS.COD_INSTITUICAO, INS.NOM_INSTITUICAO, INS.NUM_TELEFONE, INS.IND_TIPO_INSTITUICAO, INS.DES_EMAIL, CID.NOM_CIDADE FROM INSTITUICAO INS INNER JOIN CIDADE CID ON (INS.CIDADE_COD_CIDADE = CID.COD_CIDADE) WHERE IND_EXCLUIDO=:excluido ORDER BY COD_INSTITUICAO DESC LIMIT :inicio, :QtdExibida"); 
        $stmt->bindParam(':excluido', $excluido);
        $stmt->bindValue(':inicio', (int) $inicio, PDO::PARAM_INT);
        $stmt->bindValue(':QtdExibida', (int) $QTD_Exibida, PDO::PARAM_INT);
        $stmt->execute();
        
        $instituicoes = array();
        while($row = $stmt->fetch(PDO::FETCH_OBJ)){
             $instituicoes[] = $row;
       }

        if(empty($instituicoes)){
            return array("sucesso"=>false,
            "mensagem"=>ERRO_NENHUMA_INSTITUICAO);
        }
        
        return array("sucesso"=>true,
                    "TotalRegistros"=>(int)$QTD_Instituicao,
                    "QuantidadePaginas"=>$Num_Paginas, 
                    "data"=>$instituicoes);
                    
        $conn = null;
    }
    
    public function GetCidades(){
        require_once "Conexao.php";

        $stmt = $conn->prepare("SELECT COD_CIDADE, NOM_CIDADE FROM CIDADE ORDER BY NOM_CIDADE ASC"); 
        $stmt->execute();
        
        $cidades = array();
        
       while($row = $stmt->fetch(PDO::FETCH_OBJ)){
           $cidades[] = $row;
       }
       
        return array("sucesso"=>true,
                    "data"=>$cidades);
                    
        $conn = null;
    }
}
    