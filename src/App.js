import React from "react";
import axios from "axios";
import "./styles.css";
class App extends React.Component {
	state = {
		show: false,
		content: "",
		title: "",
	};
	removeHTML(string){
		const regex = /(<([^>]+)>)/ig;
		const result = string.replace(regex, '');
		return result;
	}
	showModal = getContent => {
		if (typeof getContent === 'string' || getContent instanceof String){
			axios({
				method: "get",
				url: "http://api.tvmaze.com/search/shows?q="+getContent,
			}).then((response) => {
				let movies = response.data;
				let match = false;
				{movies.map((movie,i) => {
					if( movie.show.language === "English" && match === false ){
						match = true;
						this.setState({
							title: movie.show.name,
							content: this.removeHTML(movie.show.summary)
						});
					}
				})}
			}, (error) => {
				console.log(error);
			});
		}else{
			this.setState({
				content: "",
				title: "",
			});
		}
		this.setState({
			show: !this.state.show
		});
	};
	render() {
		return (
			<div className="App">
				<button
					className="toggle-button centered-toggle-button"
					onClick={e => {
						this.showModal("The Golden Girls");
					}}
				>
					Golden Girls
				</button>
				<button
					className="toggle-button centered-toggle-button"
					onClick={e => {
						this.showModal("Jane The Virgin");
					}}
				>
					Jane The Virgin
				</button>
				{this.state.show && (
					<div className="modal" id="modal">
						<h2>{this.state.title}</h2>
						<div className="content">
							{this.state.content}
						</div>
						<div className="actions">
						  <button className="toggle-button" onClick={this.showModal}>
							close
						  </button>
						</div>
					</div>
				)}
			</div>
		);
	}
}
export default App;