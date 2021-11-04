<template>
    <div>
    <el-button type="primary" class="md-raised" >Ajouter un restaurant</el-button>
    <br>
        <div class="information">

            <el-col :span="12" :offset="6" class="carré" >
                <el-row >
                    <el-col class="détails">
                        Détails
                    </el-col>
                </el-row>
                <el-row >
                    <el-col class="col" :span="12">
                        <div class="gauche1">Prénom</div>
                        <div class="prénom" ><a> XXXXXXXX </a></div>
                    </el-col>
                    <el-col class="col" :span="12">
                        <div class="droite1">Nom</div>
                        <div class="nom" > XXXX </div>
                    </el-col>
                </el-row> 
                <el-row >
                    <el-col class="col" :span="12">
                        <div class="gauche1">Email</div>
                        <div class="email" > xxxx@homtail.com </div>
                    </el-col>
                    <el-col class="col" :span="12">
                        <div class="droite1">Téléphone Mobile</div>
                        <div class="télephone" > XX XX XX XX XX </div>
                    </el-col>
                </el-row>   
            </el-col>
        </div>

        <el-row class="espace"></el-row>

        <div>
            <el-col :span="12" :offset="6" class="carré" >
                <el-row >
                    <el-col class="adresse">
                        Adresse
                    </el-col>
                </el-row>
                <el-row >
                    <el-col class="col">
                        <div class="adr" ><a> XXXXXXXX XXXX XXXX </a></div>
                    </el-col>

                    <el-col class="col">
                        <div class="adr" ><a> XXXXXXXX XXXX XXXX </a></div>
                    </el-col>

                </el-row> 
            </el-col>
        </div>

        <el-row class="espace"></el-row>

        <div>
            <el-col :span="12" :offset="6" class="carré" >
                <el-row >
                    <el-col class="cb">
                        Cartes Enregistrées
                    </el-col>
                </el-row>
                <el-row >
                    <el-col class="col">
                        <div class="carte" >
                        <i class="el-icon-bank-card"></i>
                        <a> XXXXXXXX XXXX XXXX </a></div>
                    </el-col>
                </el-row>
                <p>Vous voulez ajouter une autre carte ? Passer une commande et sélectionnez " Ajouter une carte " avant de valider</p>
            </el-col>
    
        </div>


    </div>

    

</template>

<script>

</script>

<style>

.carré{
    border:solid #2c3e50 2px;
    margin-top:30px;
}



.espace{
    padding: 80px;
}

.détails, .adresse,.cb{
  background-color: #2c3e50 ;
  color:white;
  padding:1%;
  font-size:25px;
  border: solid white 1px;
}

.col{
  background-color: #2c3e50 ;  
}

.adr{
  border-bottom: solid black 0.01px;
}

.gauche1, .droite1{
    font-size: 16px;
    color:white;
    border: solid white 2px;
    padding: 7px; 
}

.prénom,.nom, .email, .télephone, .adr, .carte{
    padding: 20px;
    background-color:white;
}

.md-raised{
    background-color:#2c3e50 ;
    border-color:#2c3e50 ;
}


</style>
