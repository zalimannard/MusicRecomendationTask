import { apiUrl } from "./config";
import axios from "axios";

export default 
{
	composition_genre:
	{
		composition_genreUrl: "muscomp_genre",
		getAllForComposition(id)
		{
			return axios({
				url: `${apiUrl}/${this.composition_genreUrl}?musicalCompositionId=${id}`,
				method: "GET"
			});
		},
		add(item)
		{
			return axios({
				url: `${apiUrl}/${this.composition_genreUrl}`,
				method: "POST",
				data: item
			});
		},
		delete(id)
		{
			return axios({
				url: `${apiUrl}/${this.composition_genreUrl}/${id}`,
				method: "DELETE"
			})
		}
	},

	composition:
	{
		compositionUrl: "music",
		getAll()
		{
			return axios({
				url: `${apiUrl}/${this.compositionUrl}`,
				method: "GET"
			});
		},
		getAllWithExpand()
		{
			return axios({
				url: `${apiUrl}/${this.compositionUrl}?expand`,
				method: "GET"
			});
		},
		getOne(id)
		{
			return axios({
				url: `${apiUrl}/${this.compositionUrl}/${id}`,
				method: "GET"
			});
		},
		add(item)
		{
			return axios({
				url: `${apiUrl}/${this.compositionUrl}`,
				method: "POST",
				data: item
			});
		},
		edit(id, item)
		{
			return axios({
				url: `${apiUrl}/${this.compositionUrl}/${id}`,
				method: "PUT",
				data: item
			});
		},
		delete(id)
		{
			return axios({
				url: `${apiUrl}/${this.compositionUrl}/${id}`,
				method: "DELETE"
			})
		}
	},

	creator:
	{
		creatorUrl: "creators",
		getAll()
		{
			return axios({
				url: `${apiUrl}/${this.creatorUrl}`,
				method: "GET"
			});
		},
		getAllWithExpand()
		{
			return axios({
				url: `${apiUrl}/${this.creatorUrl}?expand`,
				method: "GET"
			});
		},
		getOne(id)
		{
			return axios({
				url: `${apiUrl}/${this.creatorUrl}/${id}`,
				method: "GET"
			});
		},
		add(item)
		{
			return axios({
				url: `${apiUrl}/${this.creatorUrl}`,
				method: "POST",
				data: item
			});
		},
		edit(id, item)
		{
			return axios({
				url: `${apiUrl}/${this.creatorUrl}/${id}`,
				method: "PUT",
				data: item
			});
		},
		delete(id)
		{
			return axios({
				url: `${apiUrl}/${this.creatorUrl}/${id}`,
				method: "DELETE"
			})
		}
	},

	genre:
	{
		genreUrl: "genres",
		getAll()
		{
			return axios({
				url: `${apiUrl}/${this.genreUrl}`,
				method: "GET"
			});
		},
		getOne(id)
		{
			return axios({
				url: `${apiUrl}/${this.genreUrl}/${id}`,
				method: "GET"
			});
		},
		add(item)
		{
			return axios({
				url: `${apiUrl}/${this.genreUrl}`,
				method: "POST",
				data: item
			});
		},
		edit(id, item)
		{
			return axios({
				url: `${apiUrl}/${this.genreUrl}/${id}`,
				method: "PUT",
				data: item
			});
		},
		delete(id)
		{
			return axios({
				url: `${apiUrl}/${this.genreUrl}/${id}`,
				method: "DELETE"
			})
		}
	},

	country:
	{
		countryUrl: "countries",
		getAll()
		{
			return axios({
				url: `${apiUrl}/${this.countryUrl}`,
				method: "GET"
			});
		},
		getOne(id)
		{
			return axios({
				url: `${apiUrl}/${this.countryUrl}/${id}`,
				method: "GET"
			});
		},
		add(item)
		{
			return axios({
				url: `${apiUrl}/${this.countryUrl}`,
				method: "POST",
				data: item
			});
		},
		edit(id, item)
		{
			return axios({
				url: `${apiUrl}/${this.countryUrl}/${id}`,
				method: "PUT",
				data: item
			});
		},
		delete(id)
		{
			return axios({
				url: `${apiUrl}/${this.countryUrl}/${id}`,
				method: "DELETE"
			})
		}
	},

	language:
	{
		languageUrl: "languages",
		getAll()
		{
			return axios({
				url: `${apiUrl}/${this.languageUrl}`,
				method: "GET"
			});
		},
		getOne(id)
		{
			return axios({
				url: `${apiUrl}/${this.languageUrl}/${id}`,
				method: "GET"
			});
		},
		add(item)
		{
			return axios({
				url: `${apiUrl}/${this.languageUrl}`,
				method: "POST",
				data: item
			});
		},
		edit(id, item)
		{
			return axios({
				url: `${apiUrl}/${this.languageUrl}/${id}`,
				method: "PUT",
				data: item
			});
		},
		delete(id)
		{
			return axios({
				url: `${apiUrl}/${this.languageUrl}/${id}`,
				method: "DELETE"
			})
		}
	}
}