from typing import Dict, List, Literal, Tuple

from pydantic import BaseModel

class Fruit(BaseModel):
    name: str  
    color: Literal['red', 'green']  
    bazam: Dict[str, List[Tuple[int, bool, float]]]  







print(
    Fruit(
        name='Apple',
        color='red',
        bazam={'foobar': [(1, True, 0.1)]}
    )
)



if __name__ == "__main__":
    print('hello world')
    
    
    