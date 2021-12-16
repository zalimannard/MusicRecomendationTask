<template>
  <v-app>
    <v-navigation-drawer
      app
      left
      temporary
      v-model="drawer"
    >
      <v-list-item-group>     
        <v-list-item
          v-for="item in menu_items"
          :key="item.id"
        >
          <v-list-item-title>
            <router-link
              :to="item.url"
              style = "
                text-decoration: none;
                color: black;
              "
            >
              {{ item.name }}
            </router-link>
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-navigation-drawer>

    <v-app-bar
      app
      color = red
      style="
        font-family: Roboto;
        font-size: 20px;
        color: white;"
    >
      <v-app-bar-nav-icon 
        color = white
        @click="drawer = !drawer"
      >
      </v-app-bar-nav-icon>

      <h4 
        style="
          margin-left: 10px;"
        >
        Управление службой рекомендации музыки
      </h4>
    </v-app-bar>

    <v-main>
      <v-card
        style = "
          margin-top: 50px;
          margin-left: 20%;
          margin-right: 20%;
        "
      >
        <v-data-table
          :headers="headers"
          :items="countries"
          sort-by="id"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>
                Страны
              </v-toolbar-title>
              <v-spacer>
              </v-spacer>
              <v-dialog
                v-model="dialog"
                max-width="500px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color = "red"
                    dark
                    class = mb-2
                    v-bind="attrs"
                    v-on="on"
                  >
                    Добавить
                  </v-btn>
                </template>
                <v-card>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          md="80"
                        >
                          <v-text-field
                            v-model="editedItem.name"
                            label="Название страны"
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer>
                    </v-spacer>
                    <v-btn
                      class="white--text"
                      color=green
                      @click="save"
                    >
                      Сохранить
                    </v-btn>
                    <v-btn
                      class="white--text"
                      color=red
                      @click="close"
                    >
                      Отмена
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">Действительно удалить?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" @click="deleteItemConfirm" class="white--text">
                      Да
                    </v-btn>
                    <v-btn color="green" @click="closeDelete" class="white--text">
                      Нет
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-main>
  </v-app>
</template>
<script>
  import Api from "../api.js"


  export default {
    data: () => ({
      drawer: false,
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Название', value: 'name' },
        { text: 'Действия', value: 'actions', sortable: false },
      ],

      countries: [],

      menu_items:[
      {
        id: 0,
        name: "Композиции",
        url: "/compositions"
      },
      {
        id: 1,
        name: "Создатели",
        url: "/creators"
      },
      {
        id: 2,
        name: "Жанры",
        url: "/genres"
      },
      {
        id: 3,
        name: "Страны",
        url: "/countries"
      },
      {
        id: 4,
        name: "Языки",
        url: "/languages"
      }
      ],

      editedIndex: -1,
      editedItem: {
        name: '',
      },
      defaultItem: {
        name: '',
      },
    }),
    mounted() {
      Api.country.getAll().then(response => (this.countries = response.data))
    },
    methods: {
      editItem(item){
        this.editedIndex = this.countries[this.countries.indexOf(item)].id
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem(item){
        this.editedIndex = this.countries[this.countries.indexOf(item)].id
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm(){
        Api.country.delete(this.editedIndex)
        this.closeDelete()
        window.location.reload()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = this.defaultItem
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = this.defaultItem
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedItem.name != "")
        {
          if (this.editedIndex > -1) {
            Api.country.edit(this.editedIndex, this.editedItem)
          } else {
            Api.country.add(this.editedItem)
          }
          this.close()
          window.location.reload()
        }
      },
    }
  }
</script>