import json
import random
from datetime import datetime, timedelta
import os

downloads_path = r"C:\Users\marco\Downloads"
try:
    os.chdir(downloads_path)
    print(f"Aktuální adresář: {os.getcwd()}")
except Exception as e:
    print(f"Chyba při změně adresáře: {e}")

statuses = ["new", "in-progress", "completed"]

def generate_orders(n=1000):
    orders = []
    for i in range(1, n+1):
        order = {
            "id": str(i),
            "code": f"E{1000 + i}",
            "name": f"Project {i}"
        }
        orders.append(order)
    print(f"Vygenerováno {len(orders)} objednávek")
    return orders

def generate_terms(orders, terms_per_order=2):
    terms = []
    term_id_counter = 1
    base_date = datetime(2025, 6, 1)
    
    for order in orders:
        order_id = order["id"]
        for j in range(terms_per_order):
            start_offset = random.randint(0, 30) + j * 10
            start_date = base_date + timedelta(days=start_offset)
            end_date = start_date + timedelta(days=random.randint(3,7))
            term = {
                "id": f"t{term_id_counter}",
                "orderId": order_id,
                "code": f"T{term_id_counter}",
                "startDate": start_date.strftime("%Y-%m-%d"),
                "endDate": end_date.strftime("%Y-%m-%d"),
                "status": random.choice(statuses)
            }
            terms.append(term)
            term_id_counter += 1
    print(f"Vygenerováno {len(terms)} termínů")
    return terms

def main():
    orders = generate_orders(10000)
    terms = generate_terms(orders, terms_per_order=2)

    data = {
        "orders": orders,
        "terms": terms
    }

    output_file = "output.json"
    try:
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
        print(f"Data uložena do {output_file}")
    except Exception as e:
        print(f"Chyba při zápisu do souboru: {e}")

if __name__ == "__main__":
    main()
