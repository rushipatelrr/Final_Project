from fastapi import FastAPI
import pandas as pd
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

df_food = pd.read_csv("model/unique_food_dataset_1300.csv")

if "popularity" not in df_food.columns:
    print("Popularity column missing — generating now.")

    orders_norm = (df_food['orders'] - df_food['orders'].min()) / (df_food['orders'].max() - df_food['orders'].min())
    rating_norm = (df_food['rating'] - df_food['rating'].min()) / (df_food['rating'].max() - df_food['rating'].min())

    df_food['popularity'] = 0.6 * orders_norm + 0.4 * rating_norm

    df_food.to_csv("model/unique_food_dataset_1300.csv", index=False)
    print("Popularity column created and saved successfully.")

df_embeddings = pd.read_csv("model/food_item_embeddings.csv")

embeddings = df_embeddings.drop(columns=["item_id", "name"]).values

similarity_matrix = cosine_similarity(embeddings)

id_to_index = {int(r["item_id"]): i for i, r in df_embeddings.iterrows()}
index_to_id = {i: int(r["item_id"]) for i, r in df_embeddings.iterrows()}


@app.get("/")
def home():
    return {"message": "GNN microservice running successfully!"}

@app.get("/popular")
def get_popular(limit: int = 10):
    try:
        pop = df_food.sort_values("popularity", ascending=False).head(limit)
        return pop.to_dict(orient="records")
    except Exception as e:
        return {"error": str(e)}

@app.get("/recommend")
def recommend(item_id: int, top_k: int = 5):
    if item_id not in id_to_index:
        return {"error": "Invalid item_id"}

    idx = id_to_index[item_id]
    scores = similarity_matrix[idx]

    top_indices = np.argsort(scores)[::-1][1:top_k+1]

    return df_embeddings.iloc[top_indices][["item_id", "name"]].to_dict(orient="records")

@app.get("/recommend-new-user")
def recommend_new_user(top_n: int = 5):

    top_items = df_food.sort_values("popularity", ascending=False).head(top_n)

    output = {}

    for _, row in top_items.iterrows():
        iid = int(row["item_id"])
        idx = id_to_index[iid]

        scores = similarity_matrix[idx]
        neighbors = np.argsort(scores)[::-1][1:6]
        neighbor_items = df_embeddings.iloc[neighbors][["item_id", "name"]]

        output[row["name"]] = neighbor_items.to_dict(orient="records")

    return output
