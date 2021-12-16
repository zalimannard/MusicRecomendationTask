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
          :items="compositions"
          sort-by="id"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>
                Композиции
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
                            label="Название композиции"
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-select
                          v-model="editedItem.composer"
                          :items="creators"
                          item-text="name"
                          label="Автор"
                        >
                        </v-select>
                      </v-row>
                      <v-row>
                        <v-select
                          v-model="editedItem.singer"
                          :items="creators"
                          item-text="name"
                          label="Исполнитель"
                        >
                        </v-select>
                      </v-row>
                      <v-row>
                        <v-select
                          v-model="editedItem.language"
                          :items="languages"
                          item-text="name"
                          label="Язык"
                        >
                        </v-select>
                      </v-row>
                      <v-row>
                        <v-select
                          v-model="editedItem.genres"
                          :items="genres"
                          item-text="name"
                          :menu-props="{ maxHeight: '400' }"
                          label="Жанры"
                          multiple
                          persistent-hint
                        >
                        </v-select>
                      </v-row>
                      <v-row>
                        <v-col
                          md="80"
                        >
                          <v-text-field
                            v-model="editedItem.year"
                            label="Год"
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
        { text: 'Автор', value: 'composerResource.name' },
        { text: 'Исполнитель', value: 'singerResource.name' },
        { text: 'Язык', value: 'languageResource.name' },
        { text: 'Жанр', value: 'genreConcat' },
        { text: 'Год', value: 'year' },
        { text: 'Действия', value: 'actions', sortable: false },
      ],

      stableCompositions: [],
      compositions: [],
      creators: [],
      languages: [],
      genres: [],
      answer: [],
      composition_genres: [],

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
        composer: '',
        singer: '',
        language: '',
        genres: [],
        year: '',
      },
      defaultItem: {
        name: '',
        composer: '',
        singer: '',
        language: '',
        genres: [],
        year: '',
      },
      postedItem: {
        name: '',
        composerId: '',
        singerId: '',
        languageId: '',
        year: '',
      },
      postedIntertable: {
        genreId: '',
        musicalCompositionId: '',
      },
    }),
    mounted() {
      Api.composition.getAllWithExpand().then(response => {
        this.stableCompositions = response.data
        this.compositions = this.stableCompositions
        for (let i = 0; i < this.compositions.length; i += 1) {
          this.compositions[i].year = this.compositions[i].year.split("-")[0]
          this.compositions[i].genreConcat = ""
          for (let j = 0; j < this.compositions[i].genreResources.length; j += 1){
            this.compositions[i].genreConcat += this.compositions[i].genreResources[j].name
            this.compositions[i].genreConcat += " "
          }
        }
      })
      
      Api.creator.getAll().then(response => (this.creators = response.data))
      Api.language.getAll().then(response => (this.languages = response.data))
      Api.genre.getAll().then(response => (this.genres = response.data))
    },
    methods: {
      editItem(item){
        this.editedIndex = this.compositions[this.compositions.indexOf(item)].id
        var tmpGenres = []
        for (let i = 0; i < item.genreResources.length; i += 1){
          tmpGenres.push(item.genreResources[i].name)
        }
        this.editedItem = 
        {
          name: item.name,
          composer: item.composerResource.name,
          singer: item.singerResource.name,
          language: item.languageResource.name,
          genres: tmpGenres,
          year: item.year,
        }
        this.dialog = true
      },

      deleteItem(item){
        this.editedIndex = this.compositions[this.compositions.indexOf(item)].id
        var tmpGenres = []
        for (let i = 0; i < item.genreResources.length; i += 1){
          tmpGenres.push(item.genreResources[i].name)
        }
        this.editedItem = 
        {
          name: item.name,
          composer: item.composerResource.name,
          singer: item.singerResource.name,
          language: item.languageResource.name,
          genres: tmpGenres,
          year: item.year,
        }
        this.dialogDelete = true
      },

      deleteItemConfirm(){
        Api.composition_genre.getAllForComposition(this.editedIndex).then(response => {
          this.composition_genres = response.data;
          console.log(this.composition_genres.length)
          for (let i = 0; i < this.composition_genres.length; i += 1){
            console.log("Удаление связи");
            Api.composition_genre.delete(this.composition_genres[i].id);
          }

          Api.composition.delete(this.editedIndex);
          this.closeDelete();
          window.location.reload()
        })
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

        if ((this.editedItem.name != "") && (this.editedItem.composer != "") && (this.editedItem.singer != "") && (this.editedItem.language != "") && (this.editedItem.year != "")){

          if (!isNaN(Number(this.editedItem.year))){
            if ((Number.parseInt(this.editedItem.year) > 999) && (Number.parseInt(this.editedItem.year) < 10000)){
              this.postedItem.name = this.editedItem.name
              for (let i = 0; i < this.creators.length; i += 1){
                if (this.creators[i].name == this.editedItem.composer){
                  this.postedItem.composerId = this.creators[i].id
                }
              }
              for (let i = 0; i < this.creators.length; i += 1){
                if (this.creators[i].name == this.editedItem.singer){
                  this.postedItem.singerId = this.creators[i].id
                }
              }
              for (let i = 0; i < this.languages.length; i += 1){
                if (this.languages[i].name == this.editedItem.language){
                  this.postedItem.languageId = this.languages[i].id
                }
              }
              this.postedItem.year = this.editedItem.year + "-12-31"

              console.log("Вписываемый элемент:")
              console.log(this.editedItem)
              console.log("Отправляемый элемент:")
              console.log(this.postedItem)
              console.log("Индекс отправляемого элемента:")
              console.log(this.editedIndex)

              if (this.editedIndex > -1) {
                Api.composition_genre.getAllForComposition(this.editedIndex).then(response => {
                  this.composition_genres = response.data;
                  console.log(this.composition_genres.length)
                  for (let i = 0; i < this.composition_genres.length; i += 1){
                    console.log("Удаление связи")
                    Api.composition_genre.delete(this.composition_genres[i].id)
                  }

                  Api.composition.edit(this.editedIndex, this.postedItem).then(response => {
                    this.answer = response.data;
                    console.log("Ответ от сервера:")
                    console.log(this.answer);
                    console.log("Вписываемый элемент:")
                    console.log(this.editedItem)
                    console.log("Массив с жанрами:")
                    console.log(this.editedItem.genres)
                    for (let i = 0; i < this.editedItem.genres.length; i += 1){
                      this.postedIntertable.musicalCompositionId = this.editedIndex

                      for (let j = 0; j < this.genres.length; j += 1){
                        if (this.genres[j].name == this.editedItem.genres[i]){
                          this.postedIntertable.genreId = this.genres[j].id
                        }
                      }
                      console.log("Добавление элементов в БД:")
                      console.log("Id композиции:")
                      console.log(this.postedIntertable.musicalCompositionId)
                      console.log("Id жанра:")
                      console.log(this.postedIntertable.genreId)
                      Api.composition_genre.add(this.postedIntertable)
                    }
                    this.close()
                    window.location.reload()
                  })
                })
              } else {
                Api.composition.add(this.postedItem).then(response => {
                  this.answer = response.data;
                  console.log("Ответ от сервера:")
                  console.log(this.answer);
                  console.log("Длина массива с жанрами:")
                  console.log(this.editedItem.genres.length)
                  for (let i = 0; i < this.editedItem.genres.length; i += 1){
                    this.postedIntertable.musicalCompositionId = this.answer.id

                    for (let j = 0; j < this.genres.length; j += 1){
                      if (this.genres[j].name == this.editedItem.genres[i]){
                        this.postedIntertable.genreId = this.genres[j].id
                      }
                    }
                    console.log("Добавление элементов в БД:")
                    console.log("Id композиции:")
                    console.log(this.postedIntertable.musicalCompositionId)
                    console.log("Id жанра:")
                    console.log(this.postedIntertable.genreId)
                    Api.composition_genre.add(this.postedIntertable)
                  }
                  this.close()
                  window.location.reload()
                })
              }



              
            }
          }
        }
      },
    }
  }
</script>