import { useState } from "react";
import "./App.css";
import upper from "./assets/upper.svg";
import lower from "./assets/lower.svg";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';
import upper1 from "./assets/upper1.png";
import lower1 from "./assets/lower1.png";
function App() {
  const [count, setCount] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [inputValue,setInputValue]=useState('');
  const [data,setData]=useState(null);

  const handleInputChange=(e)=>{
    setInputValue(e.target.value);
  }
  const fetchPokemon =async()=>{
    if(!inputValue){
      alert("Enter a Name first!")
      throw new Error("enter a name!");
      return
    }
    setInputValue("")
    const pokemon=inputValue.toLowerCase().trim();
    const response= await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemon}`)
    if (!response.ok) {        
        throw new Error("Pokémon not found");        
    }   
    const json=await response.json()

    console.log(json)
    setData(json);

  }

  return (
    <div className="pokedex">
      <div className={`${clicked ? "triggerBtnClose" : "triggerBtn"}`} onClick={() => setClicked(true)}>
        <SearchIcon className="searchIcon" sx={{ fontSize: "60px", color: "#1faef6" }} />
      </div>
      <div className={`${clicked ? "closeBtn" : "closeBtnClose"}`} onClick={() => setClicked(false)}>
        <CloseIcon className="closeIcon" sx={{ fontSize: "60px", color: "#1faef6" }}/>
      </div>
      <div className="pokedex_container">
        <div className={`upper ${clicked ? "open" : ""}`}>
          <img className="pokedex_upper" src={upper1} alt="pokedex_upper" />
        </div>

        {clicked && (
          <div className="middle">
            <div className="table">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <strong>Base</strong>
                    </td>
                    <td>
                      <strong>Stats</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>HP:</td>
                    <td className="val" id="hp">
                      {data?.stats[0].base_stat}
                    </td>
                  </tr>
                  <tr>
                    <td>Attack:</td>
                    <td className="val" id="attack">
                      {data?.stats[1].base_stat}
                    </td>
                  </tr>
                  <tr>
                    <td>Defense:</td>
                    <td className="val" id="defense">
                      {data?.stats[2].base_stat}
                    </td>
                  </tr>
                  <tr>
                    <td>SP-Attack:</td>
                    <td className="val" id="special-attack">
                      {data?.stats[3].base_stat}
                    </td>
                  </tr>
                  <tr>
                    <td>SP-Defense:</td>
                    <td className="val" id="special-defense">
                      {data?.stats[4].base_stat}
                    </td>
                  </tr>
                  <tr>
                    <td>Speed:</td>
                    <td className="val" id="speed">
                      {data?.stats[5].base_stat}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="right_section">
              <div className="top_side">

                <div className="pokemon_card">
                  <div className="img_container">
                    <div id="sprite-container" className="sprite-container">
                      {
                        data&&
                        <img src={data?.sprites.front_default} />
                      }
                    </div>
                  </div>
                </div>

                <div className="info_card">
                  <div className="name">
                    <p id="pokemon-name">{data?.name}</p>
                    <p id="pokemon-id">{data&&`#${data?.id}`}</p>
                  </div>
                  <div className="size">
                    <p id="weight">{data&&`Weight:${data?.weight/10}kg`}</p>
                    <p id="height">{data&&`Height:${data?.height/10}m`}</p>
                  </div>
                  <div id="types">{
                    data?.types.map((typeObj,index)=>(
                      <span key={index}>{typeObj.type.name}</span>
                    ))
                    }</div>
                </div>

              </div>

              <div className="search_box">
                <input onChange={handleInputChange} value={inputValue} type="text" id="search-input" required placeholder="pokemon name" />
                <button id="search-button" onClick={fetchPokemon}>search</button>
              </div>
            </div>
          </div>
        )}

        <div className={`lower ${clicked ? "open" : ""}`}>
          <img className="pokedex_lower" src={lower1} alt="pokedex_lower" />
        </div>
      </div>
    </div>
  );
}

export default App;
