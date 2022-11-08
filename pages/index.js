import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";


function HomePage() {
    const estiloHomePage = {
        //backgroundColor: "yellow", fontSize: "36px"
    }
    console.log(config.playlists)
    return (
        <>
            <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu />
                <Header />
                <Timeline lists={config.playlists} />
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


const StyledHeader = styled.div `
    img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }
    .user-info {
        margin-top: 50px;
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

function Timeline (propriedade) {
    //console.log("Dentro do componente", propriedade.lists)
    const playlistsNames = Object.keys(propriedade.lists)// o lists se refere ao nome dado na props do componente HomePage()
    // statement , o tipo de loop do For e que não é aceito no React
    // Retorno por expressão, no caso do Map() e ForEach() por exemplo 
    // porém o forEach() retorna undefined, pois diferente do map() ele não retorna nada, o map() retorna uma nova array, convertendo os itens da arr em uma "nova coisa"
    return (
       <StyledTimeline>
            {playlistsNames.map(function(playlistName) {
                const videos = propriedade.lists[playlistName]
                //console.log(videos)
                return (
                    <section>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.map((video) => {
                                    return (
                                        <a href={video.url}>
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