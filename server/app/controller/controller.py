import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from pathlib import Path

class RecoController:
    def __init__(self, repository):
        current_dir = Path(__file__).parent
        csv_path = current_dir / '../../data-analisys/clean_movies_data.csv'
        if not csv_path.exists():
            raise FileNotFoundError(f"Arquivo CSV não encontrado em: {csv_path}")
        try:
            self.movies = pd.read_csv(csv_path)      
        except Exception as e:
            raise ValueError(f"Erro ao carregar CSV: {str(e)}")

        self.mood_mapping = {
                'Feliz': ['Comedy', 'Family', 'Animation'],
                'Triste': ['Drama', 'Romance'],
                'Romântico': ['Romance', 'Drama', 'Music'],
                'Empolgante': ['Action', 'Adventure', 'Thriller'],
                'Assustador': ['Horror', 'Thriller', 'Mystery'],
                'Aventureiro': ['Adventure', 'Fantasy', 'Science Fiction'],
                'Curioso': ['Documentary', 'History', 'Mystery'],
                'Tenso': ['Crime', 'Thriller', 'Mystery'],
                'Reflexivo': ['Drama', 'History', 'War'],
                'Nostálgico': ['Music', 'Family', 'Romance'],
                'Relaxado': ['Comedy', 'Animation', 'Documentary'],
                'Épico': ['War', 'History', 'Adventure', 'Western'],
                'Intrigante': ['Foreign', 'Mystery', 'Documentary'],
                'Leve': ['Comedy', 'Family', 'TV Movie']
            }
        self.repository = repository

    def getRecomendation(self, info):
        try:
            mood_genres = self.mood_mapping[info['mood']]
            filtered_movies = self.movies[self.movies['genres'].apply(lambda x: any(genre in x for genre in mood_genres))]

            if info['favorite_movie'] and info['favorite_movie'] in self.movies['title'].values:
                tfidf = TfidfVectorizer(stop_words='english')
                tfidf_matrix = tfidf.fit_transform(self.movies['overview'].fillna(''))
                movie_idx = self.movies[self.movies['title'] == info['favorite_movie']].index[0]
                cosine_sim = cosine_similarity(tfidf_matrix[movie_idx], tfidf_matrix)
                sim_scores = list(enumerate(cosine_sim[0]))
                sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
                top_indices = [i[0] for i in sim_scores[1:6]]  # Top 5

                dict_filtered_movies = filtered_movies[filtered_movies.index.isin(top_indices)].to_dict(orient='records')

                return {
                "body": {"movies_related": dict_filtered_movies, },
                "status_code": 200
                } 
            
            dict_filtered_movies = filtered_movies.sort_values(by='weighted_rating', ascending=False).head(5).to_dict(orient='records')
            return {
                "body": {"movies_related": dict_filtered_movies },
                "status_code": 200
                } 
        
        except Exception as exception:
            return{
                "body":{"error":"Bad Request", "message":str(exception)},
                "status_code":400
            }