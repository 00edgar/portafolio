import pandas as pandas
from mistral import Mistral
import json
{
    'transaction_id': ['T1001', 'T1002', 'T1003', 'T1004', 'T1005'],
    'customer_id': ['C001', 'C002', 'C003', 'C002', 'C001'],
    'payment_amount': [125.50, 89.99, 120.00, 54.30, 210.20],
    'payment_date': ['2021-10-05', '2021-10-06', '2021-10-07', '2021-10-05', '2021-10-08'],
    'payment_status': ['Paid', 'Unpaid', 'Paid', 'Paid', 'Pending']
}
import pandas as pd
import json

def retrieve_transaction_field(df: pd.DataFrame, transaction_id: str, field_name: str) -> str:
    """Función genérica para buscar cualquier campo de una transacción."""
    # Filtrar el DataFrame de forma eficiente
    match = df[df['transaction_id'] == transaction_id]
    
    if match.empty:
        return json.dumps({'error': 'ID de la transacción no fue encontrado'})
        
    # Obtener el valor de la columna solicitada de manera segura
    value = match[field_name].item()
    
    # Si es un objeto Timestamp de pandas, lo convertimos a texto para el JSON
    if hasattr(value, 'isoformat'):
        value = value.isoformat()
        
    return json.dumps({field_name: value})

# --- Mapeo dinámico usando funciones lambda ---
names_to_functions = {
    'retrieve_payment_status': lambda tid: retrieve_transaction_field(df, tid, 'payment_status'),
    'retrieve_payment_date': lambda tid: retrieve_transaction_field(df, tid, 'payment_date')
}
tools = [
    {
        "type": "function",
        "function": {
            "name": "retrieve_transaction_info",
            "description": "Obtiene información específica (estado o fecha) de una transacción bancaria usando su ID.",
            "parameters": {
                "type": "object",
                "properties": {
                    "transaction_id": {
                        "type": "string",
                        "description": "El identificador único de la transacción (ej. TXN12345)."
                    },
                    "field_name": {
                        "type": "string",
                        "enum": ["payment_status", "payment_date"],
                        "description": "El campo específico que se desea consultar."
                    }
                },
                "required": ["transaction_id", "field_name"]
            }
        }
    }
]
