<template>
  <v-container class="grey lighten-5">
     <v-app-bar
      color="amber accent-3"
      dense
    >
      <v-toolbar-title>fournisseurs</v-toolbar-title>
    </v-app-bar>
    <br/>
    <v-row>
      <v-col class="spacing-playground py-0 px-2"  cols="12" sm="4">
        <v-card>
          <v-card-title>
            Produit
            <div class="flex-grow-1"></div>
            <v-text-field
              v-model="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="fournisseurs"
            :search="search"
            dense
          >
          <template v-slot:item.action="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="addFournisseur(item)"
          >
            mdi-basket 
          </v-icon>
        </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col class="spacing-playground py-2 px-2" cols="12" sm="8">
        <v-card>
              <v-card-title>
                Compte du fournisseur : {{ itemSelect.name }}
                <div class="flex-grow-1"></div>
              </v-card-title>
              <template>
                <v-row>
                <v-col cols="4" sm="4" md="4">
                  <v-menu
                    v-model="menu1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="dateDebut"
                        label="Date debut"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="dateDebut" @input="menu1 = false"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="4" sm="4" md="4">
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="dateFin"
                        label="Date fin"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="dateFin" @input="menu2 = false"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="2" sm="2" md="2">
                   <v-btn
                      color="success"
                      @click="filtreDate()"
                    >
                      <v-icon>mdi-magnify </v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="2" sm="2" md="2">
                  <v-btn color="success"@click.stop="modal = true"
                    >
                      +
                    </v-btn>
                </v-col>
              </v-row>
              <v-toolbar flat color="white">
                        <div class="flex-grow-1"></div>
                        <v-dialog v-model="modal" max-width="500px">
                          <v-card>
                           <v-card-title class="headline">Nouvelle ligne</v-card-title>
                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <v-col cols="12" sm="12" md="12">
                                     <v-menu
                                        v-model="menu3"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        min-width="290px"
                                      >
                                        <template v-slot:activator="{ on }">
                                          <v-text-field
                                            v-model="dateAct"
                                            label="Date debut"
                                            readonly
                                            v-on="on"
                                          ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="dateAct" @input="menu3 = false"></v-date-picker>
                                      </v-menu>
                                     <v-text-field v-model="ref_" label="Ref"></v-text-field>
                                     <v-text-field v-model="amount" label="Montant"></v-text-field>
                                     <v-text-field v-model="narration" label="Narration"></v-text-field>
                                     <v-select
                                      v-model="type"
                                      :items="types"
                                      label="types"
                                      required
                                    ></v-select>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-card-text>

                            <v-card-actions>
                              <div class="flex-grow-1"></div>
                              <v-btn color="blue darken-1" text @click="modal = false">Annuler</v-btn>
                              <v-btn color="blue darken-1" text @click="saveEntree()">Enregistrer</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-toolbar>
                <v-simple-table dense>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Ref</th>
                      <th>Narration</th>
                      <th>Debit</th>
                      <th>Credit</th>
                      <th>Running balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in activites" :key="item.id">
                      <td>{{ item.date | moment("D/MM/YYYY") }}</td>
                      <td>{{ item.ref }}</td>
                      <td>{{ item.narration }}</td>
                      <td>{{ item.debit }}</td>
                      <td>{{ item.credit }}</td>
                      <td>{{ item.Running_balance }}</td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </template>
          <v-btn
            block
            color="success"
            @click="imprimer()">
            Imprimer
          </v-btn>
        </v-card>

      </v-col>
    </v-row>
     <v-snackbar
      :color="colorMessage"
      v-model="printMessage"
      :timeout="2000"
    >
      {{ message }}
      <v-btn
        color="blue"
        text
        @click="printMessage = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>

  import jsPDF from 'jspdf'
  import * as autoTable from 'jspdf-autotable'
  import moment from 'moment'

  export default {
    props: {
      source: String,
    },
    data () {
        return {
          search: '',
          activitesTemp: null,
          ref_: '',
          activites: null,
          narration: ' ',
          dateDebut: null,
          dateFin: null,
          dateAct: null,
          type: null,
          amount: 0,
          menu2: false,
          modal: false,
          menu1: false,
          menu3: false,
          printMessage: false,
          message: '',
          colorMessage: '',
          headers: [
          {
            text: 'Noms',
            align: 'left',
            sortable: false,
            value: 'name',
          },
          { text: 'Actions', value: 'action', sortable: false }],  
          produits: [],
          types: ['Debit','Credit'],
          packetages: [],
          fournisseurs: [],
          entrees: [],
          qte: 0,
          motif: '',
          itemSelect: {
              id: '',
              name: '',
              balance: 0,
            },
        }
      },
    async mounted () {
      this.initialize()
    },

    methods: {
      async initialize () {
        try {
          this.fournisseurs = (await this.axios.get('http://localhost:1337/fournisseur')).data;


        }
        catch(error) {
          this.message = "Erreur de connexion au serveur";
          this.colorMessage = "error";
          this.printMessage = true;
        }
      },
      async addFournisseur(item) {
        this.itemSelect = Object.assign({}, item);
        var date = new Date();
        this.dateDebut = (new Date(date.getFullYear(), (date.getMonth()) , 2)).toISOString().substring(0, 10);
        this.dateFin = (new Date(date.getFullYear(), (date.getMonth() + 1) , 1)).toISOString().substring(0, 10);

        this.activitesTemp = ( await this.axios.get('http://localhost:1337/activite/?fournisseur='+this.itemSelect.id)).data;

        if( this.dateDebut != null && this.dateFin != null){
          var dateD = new Date(this.dateDebut);
          var dateF = new Date(this.dateFin);

          this.activites = this.activitesTemp.filter(function (e) {
            return (new Date(e.date) >= dateD && new Date(e.date) <= dateF);
          });

        }
      },filtreDate(){
        if( this.dateDebut != null && this.dateFin != null){
          var dateD = new Date(this.dateDebut);
          var dateF = new Date(this.dateFin);

          this.activites = this.activitesTemp.filter(function (e) {
            return (new Date(e.date) >= dateD && new Date(e.date) <= dateF);
          });

        }
      },
      async saveEntree(){
         try {
          if(this.type == "Debit" ){

              this.itemSelect.balance = parseInt(this.itemSelect.balance) + parseInt(this.amount);

              await this.axios.post('http://localhost:1337/activite', {
                date: this.dateAct,
                ref: this.ref_,
                narration: this.narration,
                Running_balance: this.itemSelect.balance,
                debit: this.amount,
                fournisseur: this.itemSelect.id
              });
          }else {
            this.itemSelect.balance = parseInt(this.itemSelect.balance) - parseInt(this.amount);

            await this.axios.post('http://localhost:1337/activite', {
                      date: this.dateAct,
                      ref: this.ref_,
                      narration: this.narration,
                      Running_balance: this.itemSelect.balance,
                      credit: this.amount,
                      fournisseur: this.itemSelect.id
            });
          }

           this.activitesTemp = ( await this.axios.get('http://localhost:1337/activite/?fournisseur='+this.itemSelect.id)).data;

           if( this.dateDebut != null && this.dateFin != null){
             var dateD = new Date(this.dateDebut);
             var dateF = new Date(this.dateFin);

             this.activites = this.activitesTemp.filter(function (e) {
               return (new Date(e.date) >= dateD && new Date(e.date) <= dateF);
             });

           }

           this.ref_ = "";
           this.amount = 0;
           this.narration = "";

           await this.axios.put('http://localhost:1337/fournisseur/'+this.itemSelect.id, {
             balance: this.itemSelect.balance,
           });

           this.message = "Entrées Inserées"
        this.colorMessage = "success"
        this.printMessage = true
          
        }catch(error) {
          this.message = "Erreur de connexion au serveur"
          this.colorMessage = "error"
          this.printMessage = true
          console.error(error);
        }
      },imprimer(){
      var vm = this

      var columns = ["Date", "Ref", "Narration", "Debit", "Credit", "Running_balance"];

      var rows = [];

      for(let e of vm.activites){
        rows.push([moment(e.date).format('D/MM/YYYY - h:mm:ss '), e.ref, e.narration , e.debit, e.credit, e.Running_balance])
      }

      var title = 'Compte Fournisseur :'+ this.itemSelect.name;

      title = title + " du "+ this.dateDebut +" au "+ this.dateFin;

      var doc = new jsPDF('p', 'pt');
      doc.text(title,20,20)
      doc.autoTable(columns, rows);
      doc.save(title+'.pdf');
      }
    }
  }
</script>

/*
delimiter |

CREATE TRIGGER UpdateStkIn BEFORE INSERT ON entree
  FOR EACH ROW BEGIN
    UPDATE produit SET stock = stock + NEW.quantite WHERE id = NEW.produit;
  END;
|

delimiter |

CREATE TRIGGER UpdateStkOut BEFORE INSERT ON sortie
  FOR EACH ROW BEGIN
    UPDATE produit SET stock = stock - NEW.quantite WHERE id = NEW.produit;
  END;
|
*/