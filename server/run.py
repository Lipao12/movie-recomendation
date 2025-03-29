if __name__ == "__main__": 
    import os
    import uvicorn 
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("app.server.server:app", host="0.0.0.0", port=port)#, reload=True) # 127.0.0.1