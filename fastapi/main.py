import uvicorn
from typing import Union, Annotated
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from jose import JWTError, jwt
from model.model import OAuth2PasswordRequestForm1
app = FastAPI()

SECRET_KEY = "your-secret-key"  # 用于签名 JWT 的密钥，需要保密
ALGORITHM = "HS256"  # 加密算法

# 以下为示例部门 ID
DEPARTMENT_ID = "your-department-id"

# 使用 PyJWT 库生成 JWT
def create_jwt_token(username: str, department_id: str) -> str:
    # 设置 JWT 的过期时间为 30 分钟后
    expires_delta = timedelta(minutes=30)
    expires = datetime.utcnow() + expires_delta
    
    # 构建 JWT payload 包含的信息
    jwt_payload = {
        "sub": username,  # 主题，一般为用户 ID
        "department_id": department_id,  # 部门 ID
        "exp": expires  # 过期时间
    }
    
    # 使用 PyJWT 库生成 JWT token
    jwt_token = jwt.encode(jwt_payload, SECRET_KEY, algorithm=ALGORITHM)
    
    return jwt_token

# 示例登录路由
@app.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # 在实际应用中，这里应该是验证用户名和密码的逻辑
    # 假设验证成功，从数据库获取用户信息
    username = form_data.username
    
    # 在这个示例中，假设部门 ID 是固定的
    department_id = DEPARTMENT_ID
    
    # 生成 JWT token
    jwt_token = create_jwt_token(username, department_id)
    
    return {"access_token": jwt_token, "token_type": "bearer"}

# 示例需要认证的路由
@app.get("/secure-route")
async def secure_route(token: str = Depends(OAuth2PasswordBearer(tokenUrl="/login"))):
    try:
        # 使用 PyJWT 库解码 JWT token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        department_id = payload.get("department_id")
        return {"message": "Access granted!", "username": username, "department_id": department_id}
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

@app.get("/")
def read_root():
    return {"Hello": "World"}





async def common_parameters(q: Union[str], skip: int = 0, limit: int = 100):
    return {"q": q, "skip": skip, "limit": limit}


@app.post("/items/")
async def read_items(commons: Annotated[dict, Depends(common_parameters)]):
    return commons

