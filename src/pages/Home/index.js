import React, {Fragment, useState} from "react";
import {readString} from 'react-papaparse';
import animesList from "../../models/animes.json";
import Card from "../../components/Card";
import animesClustered from "../../models/anime_clustered.json";
import animeLinked from "../../models/anime_linked.csv";
import animesDataset from "../../models/anime_dataset.json";

const Home = () => {
    const [isDetails, setIsDetails] = useState();
    const [selectedAnime, setSelectedAnime] = useState();
    const [neighbors, setNeighbors] = useState([]);
    const [clusters, setClusters] = useState([]);
    const [mostViewed, setMostViewed] = useState([]);

    const contentBasedRecommendation = (animeId) => {
        const animeInNeighbors = animesClustered.find(anime => anime.anime_id === animeId)
        const listOfNeighborsId = animeInNeighbors.neighbors?.split(", ");
        const neighbors = [];
        listOfNeighborsId.forEach(neighborsId => {
            animesList.forEach(anime => {
                if (anime.anime_id.toString() === neighborsId.toString()) {
                    neighbors.push(anime);
                }
            })
        });
        setNeighbors(randomAndLimitArray(neighbors.slice(1), 6));
        const toReturn = {
            cluster: animeInNeighbors.cluster,
            neighbors: neighbors
        }
        return toReturn;
    }

    const contentBasedRecommendationClustering = (selectedAnimeInNeighbors) => {
        const animeCluster = selectedAnimeInNeighbors.cluster;
        const animesInSameCluster = animesClustered.filter(anime => anime.cluster.toString() === animeCluster.toString());
        let clusters = [];
        animesInSameCluster.forEach(clusterAnime => {
            animesList.forEach(anime => {
                if (anime.anime_id.toString() === clusterAnime.anime_id.toString()) {
                    clusters.push(anime);
                }
            })
        });
        // Get value that is not in neighbors array
        clusters = clusters.filter(animeObj => !selectedAnimeInNeighbors.neighbors.includes(animeObj))
        setClusters(randomAndLimitArray(clusters, 6));

    }

    const userBasedRecommendation = async (animeId) => {
        const file = animeLinked;

        const papaConfig = {
            complete: (results, file) => {
                console.log('Parsing complete:', results, file);
                const data = results.data;
                const animeIdHead = data[0];
                const selectedAnimeIndex = animeIdHead.indexOf(animeId.toString());
                const mostViewedByOthers = [];

                data.slice(1).forEach(lines => {
                    lines.map(((line, index) => {
                        if (lines[0] !== animeId && index === selectedAnimeIndex && lines[index] > 10000) {
                            mostViewedByOthers.push(lines[0]);
                        }
                    }));
                });
                const animeMostViewedByOthers = animesDataset.filter(anime => mostViewedByOthers.includes(anime.anime_id.toString()));
                setMostViewed(randomAndLimitArray(animeMostViewedByOthers, 6));
            },
            download: true,
            error: (error, file) => {
                console.log('Error while parsing:', error, file);
            },
        };

        await readString(file, papaConfig);
    }

    const randomAndLimitArray = (arr, limit) => {
        const shuffled = arr.sort(() => {
            return .5 - Math.random()
        });

        return shuffled.slice(0, limit);
    }

    const handleCardClick = async (animeId) => {
        setIsDetails(true);
        setSelectedAnime(animesList.find(anime => anime.anime_id === animeId));

        const selectedAnimeInNeighbors = contentBasedRecommendation(animeId);
        contentBasedRecommendationClustering(selectedAnimeInNeighbors);
        await userBasedRecommendation(animeId);
    }

    return (
        <Fragment>
            <div className={"content"}>
                <div className={"anime-list"}>
                    {
                        !isDetails &&
                        animesList.map(anime =>
                        <Card title={anime.title} category={anime.genre}
                              image={anime.image_url.replace("myanimelist.cdn-dena.com", "cdn.myanimelist.net")}
                                episodes={anime.episodes} score={anime.score} scored_by={anime.scored_by}
                                onClick={() => handleCardClick(anime.anime_id)} />)
                    }
                    {
                        isDetails &&
                            <Fragment>
                                <div className={"selected-anime"}>
                                    <h3>Votre sélection</h3>
                                    <Card title={selectedAnime.title} category={selectedAnime.genre}
                                          image={selectedAnime.image_url.replace("myanimelist.cdn-dena.com", "cdn.myanimelist.net")}
                                          episodes={selectedAnime.episodes} score={selectedAnime.score} scored_by={selectedAnime.scored_by} />
                                </div>
                                <div className={"recommendation-container"}>
                                    <h3>Les plus regardés dans la même catégorie</h3>
                                    <div className={"recommendations"}>
                                        {
                                            neighbors.map(anime =>
                                                <Card title={anime.title} category={anime.genre}
                                                      image={anime.image_url.replace("myanimelist.cdn-dena.com", "cdn.myanimelist.net")}
                                                      episodes={anime.episodes}
                                                      score={anime.score}
                                                      scored_by={anime.scored_by}/>)
                                        }
                                    </div>
                                    <h3>Vous pourriez aussi aimer</h3>
                                    <div className={"recommendations"}>
                                        {
                                            clusters.map(anime =>
                                                <Card title={anime.title} category={anime.genre}
                                                      image={anime.image_url.replace("myanimelist.cdn-dena.com", "cdn.myanimelist.net")}
                                                      episodes={anime.episodes}
                                                      score={anime.score}
                                                      scored_by={anime.scored_by}/>)
                                        }
                                    </div>
                                    <h3>Ceux qui ont regardé <b>{selectedAnime.title}</b> ont aussi regardé</h3>
                                    <div className={"recommendations"}>
                                        {
                                            mostViewed.map(anime =>
                                                <Card title={anime.title} category={anime.genre}
                                                      image={anime.image_url.replace("myanimelist.cdn-dena.com", "cdn.myanimelist.net")}
                                                      episodes={anime.episodes}
                                                      score={anime.score}
                                                      scored_by={anime.scored_by}/>)
                                        }
                                    </div>
                                </div>
                            </Fragment>
                    }
                </div>
            </div>
            <style>{`
                .content {
                    margin-top: 100px;
                    margin-right: auto;
                    margin-left: auto;
                    width: 90%;
                }
                
                .anime-list {
                    display: flex;
                    flex-wrap: wrap;
                    flex-basis: 2px;
                    justify-content: center;    
                }
                
                .recommendations {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                
                .recommendation-container {
                    width: 70%;
                }
            `}</style>
        </Fragment>
    );
}

export default Home;