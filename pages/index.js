import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu/Menu";
import { StyledTimeline } from "../src/components/Timeline";


function HomePage() {
    const estiloHomePage = {
        //backgroundColor: "yellow", fontSize: "36px"
    }
    //const valorDoFiltro = "t"
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    console.log(config.playlists)
    return (
        <>
            <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                {/* Prop Drilling */}
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Banner />
                <Header />
                <Timeline searchValue={valorDoFiltro} lists={config.playlists} />
            </div>
        </>
    )
}

export default HomePage

//function Menu() {
//    return (
//        <div>
//            Menu
//        </div>
//    )
//}
const StyledBanner = styled.div `
    background: cyan;
    background-image: url(""https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80"")
    height: 250px;
    img {
        height: 250px;
        object-fit: cover;
    }

`

function Banner() {
    return (
        <StyledBanner>
            <img src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80"/>
        </StyledBanner>
    )    
}

const StyledHeader = styled.div `
    img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;
function Header() {
    return (
        <StyledHeader>
            {/*<img src="banner" />*/}
            <section className="user-info">  
                <img src={`https://www.github.com/${config.github}.png`} />
                <div>
                <h2>{config.nome}</h2>
                <p>{config.cargo}</p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline ({searchValue, ...propriedades}) {
    //console.log("Dentro do componente", propriedade.lists)
    const playlistsNames = Object.keys(propriedades.lists)// o lists se refere ao nome dado na props do componente HomePage()
    // statement , o tipo de loop do For e que não é aceito no React
    // Retorno por expressão, no caso do Map() e ForEach() por exemplo 
    // porém o forEach() retorna undefined, pois diferente do map() ele não retorna nada, o map() retorna uma nova array, convertendo os itens da arr em uma "nova coisa"
    return (
       <StyledTimeline>
            {playlistsNames.map(function(playlistName) {
                const videos = propriedades.lists[playlistName]
                //console.log(videos)
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) =>{
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized)
                            }).map((video) => {
                                    return (
                                        <a key={video.url} href={video.url}>
                                            <img src={video.thumb} />
                                            <span>
                                                {video.title}
                                            </span>
                                        </a>
                                    )
                                })
                            }    
                        </div>
                    </section>
                )
            })}

       </StyledTimeline>
    )
}