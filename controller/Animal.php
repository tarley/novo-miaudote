<?php
require_once "../enum/EnumAnimal.php";
header("Content-type: application/json");


class Animal {

    public function cadastrarAnimal($p_NomeAnimal, $p_DesObservacao, $p_IdadeAnimal, $p_PorteAnimal, $p_Sexo, $p_Vacina, $p_Temperamento, $p_Instituicao, $p_Especie, $p_IndCastrado ) {
       require_once "Conexao.php";
       
       $Animal = new Animal();
       
       $erro = false;
       $mensagem = null;
       
       if(empty($p_NomeAnimal)) {
           $erro = true;
           $mensagem = ERRO_NOME_OBRIGATORIO;
       }
       elseif(empty($p_IdadeAnimal)) {
           $erro = true;
           $mensagem = ERRO_IDADE_OBRIGATORIO;
       }
       elseif(empty($p_PorteAnimal)) {
           $erro = true;
           $mensagem = ERRO_PORTE_OBRIGATORIO;
       }
       elseif(empty($p_Sexo)) {
           $erro = true;
           $mensagem = ERRO_SEXO_OBRIGATORIO;
       }
       elseif(empty($p_Instituicao)) {
           $erro = true;
           $mensagem = ERRO_INSTITUICAO_OBRIGATORIO;
       }
       elseif(empty($p_Especie)) {
           $erro = true;
           $mensagem = ERRO_ESPECIE_OBRIGATORIO;
       }
        elseif(empty($p_IndCastrado)) {
           $erro = true;
           $mensagem = ERRO_CASTRADO_OBRIGATORIO;
        }
       if($erro){
            return array("sucesso"=>false,
            "mensagem"=>$mensagem);
        }
        
        
        try {
            $stmt = $conn->prepare("INSERT INTO ANIMAL(NOM_ANIMAL, DES_OBSERVACAO, IND_IDADE, IND_PORTE_ANIMAL, 
            IND_SEXO_ANIMAL, INSTITUICAO_COD_INSTITUICAO, ESPECIE_COD_ESPECIE, DAT_CADASTRO, IND_CASTRADO, DES_VACINA, DES_TEMPERAMENTO) 
            VALUES (:nom_animal, :des_observacao, :ind_idade, :ind_porte_animal, :ind_sexo_animal, :cod_instituicao, :cod_especie, now(), :ind_castrado, :vacina, :temperamento)");
        
        
        $stmt->bindParam (':nom_animal', $p_NomeAnimal);
        $stmt->bindParam (':des_observacao', $p_DesObservacao);
        $stmt->bindParam (':ind_idade', $p_IdadeAnimal);
        $stmt->bindParam (':ind_porte_animal', $p_PorteAnimal);
        $stmt->bindParam (':ind_sexo_animal', $p_Sexo);
        $stmt->bindParam (':cod_instituicao', $p_Instituicao);
        $stmt->bindParam (':cod_especie', $p_Especie);
        $stmt->bindParam (':ind_castrado', $p_IndCastrado);
        $stmt->bindParam (':vacina', $p_Vacina);
        $stmt->bindParam (':temperamento', $p_Temperamento);
        
        $stmt->execute();
        
            return array("mensagem" => SUCESSO_ANIMAL_CRIADO,
                        "sucesso" => true);
        
        } catch(PDOException $e){
                   
                        return array("mensagem" => ERRO_ANIMAL_CRIADO."Erro:".$conn->error.$e->getMessage(),
                          "sucesso" => false);
                          
        }
       
       $conn = null;
    }
    
    public function excluirAnimal($id) {
        require_once "Conexao.php";
        
        $erro = false;
        $mensagem = null;
       
        try{
        $stmt = $conn->prepare("UPDATE ANIMAL
                SET IND_EXCLUIDO = 'T'
                WHERE COD_ANIMAL = :id");
        
        $stmt->bindParam(':id', $id);
        
        $stmt->execute();
        
        
            return array("mensagem" => SUCESSO_ANIMAL_EXCLUIDO,
                        "sucesso" => true);
                        
        } catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
            
             return array("mensagem" => ERRO_ANIMAL_EXCLUIDO."Erro:".$conn->error,
                          "sucesso" => false);
        }
        
        $conn = null;
    }
    
    public function adotarAnimal($id) {
        require_once "Conexao.php";
        
        $erro = false;
        $mensagem = null;
        
        try{
        $stmt = $conn->prepare("
                UPDATE ANIMAL
                SET IND_ADOTADO = 'T',
                    DAT_ADOCAO = NOW()
                WHERE COD_ANIMAL = :id
        ");
        
        $stmt->bindParam(':id', $id);
        
        $stmt->execute();
        
        
            return array("mensagem" => SUCESSO_ANIMAL_ADOTADO,
                        "sucesso" => true);
                        
        } catch (PDOException $e) {
            return array("mensagem" => ERRO_ANIMAL_ADOTADO."Erro:".$conn->error,
                        "sucesso" => false);
        }
        
        $conn=null;
    }
    
    public function editarAnimal($id, $p_NomeAnimal, $p_Observacao, $p_IdadeAnimal, $p_PorteAnimal, $p_Sexo, $p_Vacina, $p_Temperamento, $p_Instituicao, $p_Especie, $p_IndCastrado) {
        require_once "Conexao.php";
        
        $erro = false;
       $mensagem = null;
       
       if(empty($p_NomeAnimal)) {
           $erro = true;
           $mensagem = ERRO_NOME_OBRIGATORIO;
       }
       elseif(empty($p_IdadeAnimal)) {
           $erro = true;
           $mensagem = ERRO_IDADE_OBRIGATORIO;
       }
       elseif(empty($p_PorteAnimal)) {
           $erro = true;
           $mensagem = ERRO_PORTE_OBRIGATORIO;
       }
       elseif(empty($p_Sexo)) {
           $erro = true;
           $mensagem = ERRO_SEXO_OBRIGATORIO;
       }
       elseif(empty($p_Instituicao)) {
           $erro = true;
           $mensagem = ERRO_INSTITUICAO_OBRIGATORIO;
       }
       elseif(empty($p_Especie)) {
           $erro = true;
           $mensagem = ERRO_ESPECIE_OBRIGATORIO;
       }
        elseif(empty($p_IndCastrado)) {
           $erro = true;
           $mensagem = ERRO_CASTRADO_OBRIGATORIO;
        }
       
       if($erro){
            return array("sucesso"=>false,
            "mensagem"=>$mensagem);
        }
        try {
        $stmt = $conn->prepare( "
                UPDATE `ANIMAL` SET `NOM_ANIMAL`=:nom_animal,`DES_OBSERVACAO`=:des_observacao,`IND_IDADE`=:des_idade,`IND_PORTE_ANIMAL`=:des_porte,
                `IND_SEXO_ANIMAL`=:des_sexo,
                `INSTITUICAO_COD_INSTITUICAO`=:cod_instituicao,
                `ESPECIE_COD_ESPECIE`=:cod_especie,
                `IND_CASTRADO`=:castrado,
                `DES_VACINA`=:vacina,
                `DES_TEMPERAMENTO`=:temperamento
                WHERE COD_ANIMAL = :id");
        
        $stmt->bindParam(':nom_animal', $p_NomeAnimal);
        $stmt->bindParam(':des_observacao', $p_Observacao);
        $stmt->bindParam(':des_idade', $p_IdadeAnimal);
        $stmt->bindParam(':des_porte', $p_PorteAnimal);
        $stmt->bindParam(':des_sexo', $p_Sexo);
        $stmt->bindParam(':cod_instituicao', $p_Instituicao);
        $stmt->bindParam(':cod_especie', $p_Especie);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':castrado', $p_IndCastrado);
        $stmt->bindParam(':vacina', $p_Vacina);
        $stmt->bindParam(':temperamento', $p_Temperamento);
        
        $stmt-> execute();
        

            return array("mensagem" => SUCESSO_ANIMAL_ALTERADO,
                        "sucesso" => true);
                        
        } catch (PDOException $e) {
            return array("mensagem" => ERRO_ANIMAL_ALTERADO."Erro:".$conn->error,
                        "sucesso" => false);
        }
         
        $conn=null;
    }
    
    public function BuscarTodos() {
        require_once "Conexao.php";
        
        $sucesso=false;
        $mensagem=null;
        
        $retornarImagem = $_GET['retornarImagem'];
        
        if($retornarImagem == 'T') {

            $stmt = $conn->prepare("SELECT A.COD_ANIMAL, A.NOM_ANIMAL, A.IND_IDADE, A.IND_PORTE_ANIMAL, A.IND_SEXO_ANIMAL, A.IND_CASTRADO, A.DAT_CADASTRO, 
                A.DES_OBSERVACAO, A.DES_VACINA, A.DES_TEMPERAMENTO, I.NOM_INSTITUICAO, E.DES_ESPECIE, C.NOM_CIDADE, ES.NOM_ESTADO, F.NOM_FOTO, F.IND_FOTO_PRINCIPAL, F.TIP_FOTO, F.BIN_FOTO
                FROM ANIMAL A
				INNER JOIN FOTO F ON (A.COD_ANIMAL = F.ANIMAL_COD_ANIMAL)
                INNER JOIN INSTITUICAO I ON  (A.INSTITUICAO_COD_INSTITUICAO = I.COD_INSTITUICAO)
                INNER JOIN ESPECIE E ON (E.COD_ESPECIE = A.ESPECIE_COD_ESPECIE)
                INNER JOIN CIDADE C ON (I.CIDADE_COD_CIDADE = C.COD_CIDADE)
                INNER JOIN ESTADO ES ON (C.ESTADO_COD_ESTADO = ES.COD_ESTADO)
                WHERE A.IND_ADOTADO = 'F'
                AND A.IND_EXCLUIDO = 'F'
                AND F.IND_FOTO_PRINCIPAL = 'T'
                ORDER BY A.NOM_ANIMAL");
                
                $stmt->execute();
        
                $lista = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
                foreach($lista as $key => $value) {
                    $lista[$key]['BIN_FOTO'] = "data:image/" . $value['TIP_FOTO'] . 
                        ";base64, " . base64_encode($value['BIN_FOTO']);
                }
                
                if(empty($lista)){
                    return array("sucesso"=>false,
                    "mensagem"=>ERRO_NENHUM_ANIMAL."Erro:".$conn->error,);
                }
        
                return array("sucesso"=>true,
                    "data"=>$lista);

        }
        else {
                $stmt = $conn->prepare("SELECT A.COD_ANIMAL, A.NOM_ANIMAL, A.IND_IDADE, A.IND_PORTE_ANIMAL, A.IND_SEXO_ANIMAL, A.IND_CASTRADO, A.DAT_CADASTRO, 
                A.DES_OBSERVACAO, A.DES_VACINA, A.DES_TEMPERAMENTO, I.NOM_INSTITUICAO, E.DES_ESPECIE, C.NOM_CIDADE, ES.NOM_ESTADO
                FROM ANIMAL A 
                INNER JOIN INSTITUICAO I ON  (A.INSTITUICAO_COD_INSTITUICAO = I.COD_INSTITUICAO)
                INNER JOIN ESPECIE E ON (E.COD_ESPECIE = A.ESPECIE_COD_ESPECIE)
                INNER JOIN CIDADE C ON (I.CIDADE_COD_CIDADE = C.COD_CIDADE)
                INNER JOIN ESTADO ES ON (C.ESTADO_COD_ESTADO = ES.COD_ESTADO)
                WHERE A.IND_ADOTADO = 'F'
                AND A.IND_EXCLUIDO = 'F'
                ORDER BY A.NOM_ANIMAL");
                
                $stmt->execute();
                
                $animais = array();
        
                while($row = $stmt->fetch(PDO::FETCH_OBJ)){
                    $animais[] = $row;
                }
                
                if(empty($animais)){
                    return array("sucesso"=>false,
                    "mensagem"=>ERRO_NENHUM_ANIMAL."Erro:".$conn->error,);
                }
        
                return array("sucesso"=>true,
                    "data"=>$animais);

        }


        $conn = null;
    }
    
    public function BuscarPorId($id) {
        
        require_once "Conexao.php";
        
        $sucesso=false;
        $mensagem=null;
        
        $retornarImagem = $_GET['retornarImagem'];
        
        if($retornarImagem == 'T') {

            $stmt = $conn->prepare("SELECT A.COD_ANIMAL, A.NOM_ANIMAL, A.IND_IDADE, A.IND_PORTE_ANIMAL, A.IND_SEXO_ANIMAL, A.IND_CASTRADO, A.DAT_CADASTRO, 
                A.DES_OBSERVACAO, A.DES_VACINA, A.DES_TEMPERAMENTO, I.NOM_INSTITUICAO, E.DES_ESPECIE, C.NOM_CIDADE, ES.NOM_ESTADO, F.NOM_FOTO, F.IND_FOTO_PRINCIPAL, F.TIP_FOTO, F.BIN_FOTO
                FROM ANIMAL A
				INNER JOIN FOTO F ON (A.COD_ANIMAL = F.ANIMAL_COD_ANIMAL)
                INNER JOIN INSTITUICAO I ON  (A.INSTITUICAO_COD_INSTITUICAO = I.COD_INSTITUICAO)
                INNER JOIN ESPECIE E ON (E.COD_ESPECIE = A.ESPECIE_COD_ESPECIE)
                INNER JOIN CIDADE C ON (I.CIDADE_COD_CIDADE = C.COD_CIDADE)
                INNER JOIN ESTADO ES ON (C.ESTADO_COD_ESTADO = ES.COD_ESTADO)
                WHERE A.IND_ADOTADO = 'F'
                AND A.IND_EXCLUIDO = 'F'
                AND F.IND_FOTO_PRINCIPAL = 'T'
                AND A.COD_ANIMAL = :id
                ORDER BY A.NOM_ANIMAL");
                
                $stmt->bindParam(':id',$id);
                
                $stmt->execute();
        
                $lista = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
                foreach($lista as $key => $value) {
                    $lista[$key]['BIN_FOTO'] = "data:image/" . $value['TIP_FOTO'] . 
                        ";base64, " . base64_encode($value['BIN_FOTO']);
                }
                
                if(empty($lista)){
                    return array("sucesso"=>false,
                    "mensagem"=>ERRO_NENHUM_ANIMAL."Erro:".$conn->error,);
                }
        
                return array("sucesso"=>true,
                    "data"=>$lista);
                
        }
        else {
                $stmt = $conn->prepare("SELECT A.COD_ANIMAL, A.NOM_ANIMAL, A.IND_IDADE, A.IND_PORTE_ANIMAL, A.IND_SEXO_ANIMAL, A.IND_CASTRADO, A.DAT_CADASTRO, 
                A.DES_OBSERVACAO, A.DES_VACINA, A.DES_TEMPERAMENTO, I.NOM_INSTITUICAO, E.DES_ESPECIE, C.NOM_CIDADE, ES.NOM_ESTADO
                FROM ANIMAL A 
                INNER JOIN INSTITUICAO I ON  (A.INSTITUICAO_COD_INSTITUICAO = I.COD_INSTITUICAO)
                INNER JOIN ESPECIE E ON (E.COD_ESPECIE = A.ESPECIE_COD_ESPECIE)
                INNER JOIN CIDADE C ON (I.CIDADE_COD_CIDADE = C.COD_CIDADE)
                INNER JOIN ESTADO ES ON (C.ESTADO_COD_ESTADO = ES.COD_ESTADO)
                WHERE A.IND_ADOTADO = 'F'
                AND A.IND_EXCLUIDO = 'F'
                AND A.COD_ANIMAL = :id
                ORDER BY A.NOM_ANIMAL");
                
                $stmt->bindParam(':id',$id);
                
                $stmt->execute();
                
                $animais = array();
        
                while($row = $stmt->fetch(PDO::FETCH_OBJ)){
                    $animais[] = $row;
                }
                
                if(empty($animais)){
                    return array("sucesso"=>false,
                    "mensagem"=>ERRO_NENHUM_ANIMAL."Erro:".$conn->error,);
                }
        
                return array("sucesso"=>true,
                    "data"=>$animais);

        }
        
        
        $conn = null;
        
    }
    
    public function BuscarAdotados() {
        require_once "Conexao.php";
        
        $sucesso=false;
        $mensagem=null;
        
        $stmt = $conn->prepare("SELECT A.NOM_ANIMAL, A.IND_IDADE, A.IND_PORTE_ANIMAL, A.IND_SEXO_ANIMAL, A.IND_CASTRADO, A.DAT_CADASTRO, 
                A.DES_OBSERVACAO, A.DES_VACINA, A.DES_TEMPERAMENTO, I.NOM_INSTITUICAO, E.DES_ESPECIE, C.NOM_CIDADE, ES.NOM_ESTADO
                FROM ANIMAL A 
                INNER JOIN INSTITUICAO I ON  (A.INSTITUICAO_COD_INSTITUICAO = I.COD_INSTITUICAO)
                INNER JOIN ESPECIE E ON (E.COD_ESPECIE = A.ESPECIE_COD_ESPECIE)
                INNER JOIN CIDADE C ON (I.CIDADE_COD_CIDADE = C.COD_CIDADE)
                INNER JOIN ESTADO ES ON (C.ESTADO_COD_ESTADO = ES.COD_ESTADO)
                WHERE A.IND_ADOTADO = 'T'
                ORDER BY A.NOM_ANIMAL");
                
        $stmt->execute();
        
        $animais = array();
        
        while($row = $stmt->fetch(PDO::FETCH_OBJ)){
             $animais[] = $row;
      }

        if(empty($animais)){
            return array("sucesso"=>false,
            "mensagem"=>ERRO_NENHUM_ANIMAL);
        }
        
        return array("sucesso"=>true,
                    "data"=>$animais);
        
        $conn = null;
        
    }
    
    public function BuscarImagens($id) {
        require_once "Conexao.php";
        
        $sucesso=false;
        $mensagem=null;
        
        $stmt = $conn->prepare("SELECT * FROM FOTO WHERE ANIMAL_COD_ANIMAL = :id");
        
        $stmt->bindParam(':id', $id);
                
        $stmt->execute();
        
        $animais = array();
        
        while($row = $stmt->fetch(PDO::FETCH_OBJ)){
             $animais[] = $row;
      }

        if(empty($animais)){
            return array("sucesso"=>false,
            "mensagem"=>ERRO_ANIMAL_FOTO);
        }
        
        return array("sucesso"=>true,
                    "data"=>$animais);
        
        $conn = null;
    }
    
    public function UploadImagem($id, $imagem) {
        $tipo = pathinfo($imagem);
        $conteudo = file_get_contents($imagem['tmp_name']);
        
        $stmt=$conn -> prepare("INSERT INTO `FOTO`(`NOM_FOTO`, `TIP_FOTO`, `BIN_FOTO`, `IND_FOTO_PRINCIPAL`, `ANIMAL_COD_ANIMAL`) 
                                VALUES (:nome, :tipo, :binario, 'T', :id)");
        
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':tipo', $tipo);
        $stmt->bindParam(':binario', $conteudo);
        $stmt->bindParam(':id', $id);
        
        $stmt->execute();
        
        $conn = null;
    
    }
    
    
    
}

?>