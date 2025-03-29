from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
import io

router = APIRouter()

from app.repository.repository import RecoRepository
from app.controller.controller import RecoController

@router.get("/movie_recommendation")
async def create_reservation(mood, favorite_movie=None):
    """
    Função que retorna uma recomendação de filmes baseado no humor e no filme favorito.
    """
    try:
        repository = RecoRepository()
        controller = RecoController(repository)
        info = {
            "mood": mood,
            "favorite_movie": favorite_movie
        }
        response = controller.getRecomendation(info)
        return JSONResponse(
            content=response['body'],
            status_code=response['status_code']
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during rocomend movie: {str(e)}")
