# Limpeza de Dados para Sistema de Recomendação de Filmes

## Visão Geral

Processo de limpeza e preparação dos dados do [The Movies Dataset](https://www.kaggle.com/rounakbanik/the-movies-dataset) para um sistema de recomendação baseado em humor.

## Principais Etapas

### 1. **Importação e Junção de Dados**

- União dos datasets `movies_metadata.csv` e `credits.csv` usando a coluna `id`.
- Conversão de IDs para string para evitar incompatibilidades.

### 2. **Remoção de Colunas**

Colunas eliminadas por irrelevância ou redundância:

```python
['belongs_to_collection', 'budget', 'homepage', 'original_language',
 'revenue', 'spoken_languages', 'status', 'tagline', 'video',
 'poster_path', 'production_companies', 'production_countries', 'crew']
```

### 3. **Tratamento de Valores Nulos**

- Eliminação de linhas com valores nulos nas colunas essenciais:
  - imdb_id (17 nulos)
  - overview (954 nulos)
  - release_date (87 nulos)
  - runtime (260 nulos)

### 3. **Formatação de Colunas Complexas**

- Gêneros: Conversão de JSON string para lista de nomes:

```python
[{'id': 16, 'name': 'Animation'}] → ['Animation']
```

- Elenco (cast): Extração dos 5 primeiros atores:

```python
[{'name': 'Tom Hanks'}, ...] → ['Tom Hanks', ...]
```
