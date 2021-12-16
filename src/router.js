import Vue from 'vue';
import VueRouter from 'vue-router';
import CompositionList from './views/CompositionList'
import CreatorList from './views/CreatorList'
import GenreList from './views/GenreList'
import CountryList from './views/CountryList'
import LanguageList from './views/LanguageList'

Vue.use(VueRouter);
export default new VueRouter({
	mode: 'history',
	routes: [
		{ path: "/compositions", name: "compositions", component: CompositionList },
		{ path: "/creators", name: "creators", component: CreatorList },
		{ path: "/genres", name: "genres", component: GenreList },
		{ path: "/countries", name: "countries", component: CountryList },
		{ path: "/languages", name: "languages", component: LanguageList },
	]
});
