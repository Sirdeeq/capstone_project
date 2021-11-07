import { Component } from "react";


class Memegenerator extends Component {
  constructor() {
    super()
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
 

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const { memes } = response.data
        console.log(memes );
        this.setState({ allMemeImgs: memes })

      })
  }
  handleChange(event){
    const {name , value} = event.target
    this.setState({
      [name]: value
    })

  }
  handleSubmit(event){
    const randNum= Math.floor(Math.random() * this.state.allMemeImgs.length)
    const randMeme = this.state.allMemeImgs[randNum].url
    event.preventDefault()
    this.setState({
      randomImg:randMeme
    })
  }

  render() {
    return (
      <div>
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input
            name="topText"
            type="text"
            value={ this.state.topText}
            placeholder="top text"
            onChange={this.handleChange}
          />
          <input
            name="bottomText"
            type="text"
            value={ this.state.bottomText}
            placeholder="bottom text"
            onChange={this.handleChange}
          />
          <button>Gen</button>
        </form>
        <div  className="meme">
     <img  src={this.state.randomImg} alt=""/>
     <h2 className="top">{this.state.topText}</h2>
     <h2 className="bottom">{this.state.bottomText  }</h2> 
   </div>
      </div>
    )
  }
}


export default Memegenerator;
