from db import manager
from db import migrations
from typing import Any
def main(args: Any = None) -> None:
    manager.raceAndLocationCreateTables()
    manager.itemCreateTables()

if __name__ == '__main__':
    main()
    migrations.migrationFillingRaceAndLocation()
    migrations.migrationFillingItem()