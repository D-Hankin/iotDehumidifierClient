IoT Dehumidifier Client
=======================

Project Overview
----------------

This is the client-side component of the IoT Dehumidifier system, developed using React and TypeScript. The client is responsible for displaying daily statistics related to humidity levels and electricity prices in the user's area. It communicates with the server, which processes humidity sensor data from an Arduino R4 WiFi Uno device.

**Please note:** All references to controlling the dehumidifier directly will be introduced in version 2. Currently, this client only displays data without directly interacting with the dehumidifier.

Features
--------

-   **Humidity Statistics:** Displays daily humidity levels received from the Arduino sensor through the server.
-   **Electricity Prices:** Shows real-time electricity prices for the user's area.
-   **User Authentication:** Implements JWT (JSON Web Token) for secure user authentication.

Server and Arduino Integration
------------------------------

-   **Server:** The client receives humidity data, electricity prices, and user authentication tokens from the server. The server repository can be found [here](https://github.com/D-Hankin/iotDehumidifierServer).
-   **Arduino:** The server communicates with the Arduino R4 WiFi Uno device to retrieve humidity readings. The Arduino code can be found [here](https://github.com/D-Hankin/iotDehumidifier).

Technologies Used
-----------------

-   **React** for building the user interface.
-   **TypeScript** for ensuring code reliability and scalability.
-   **JWT** for secure user authentication.
-   **Fetch** for handling HTTP requests between the client and server.
-   **Recharter** for data visualization (graphs and charts).

How It Works
------------

1.  **Authentication:** Users log in and subsequently use JWT-based authentication for secure access to the dehumidifier statistics.
2.  **Data Fetching:** The client fetches humidity levels inclusing temperature from the server and electricity prices from an external API (https://www.elprisetjustnu.se/elpris-api).
3.  **Visualization:** Humidity data, temperature are displayed on a graph, allowing users to monitor daily statistics.
4.  **Electricity Prices:** Current electricity prices are displayed to help users manage the costs of running their dehumidifier.

Installation and Setup
----------------------

1.  Clone the repository to your local machine.
2.  Install the required dependencies using `npm install`.
3.  Start the application locally using `npm run dev`.
4.  Ensure the server is running and the client is properly connected to it for data retrieval.

Future Enhancements (Version 2)
-------------------------------

-   Integration with the dehumidifier for automatic control based on humidity levels.
-   More detailed electricity price analysis with historical trends.
-   Customizable user notifications and email alerts for high humidity.
-   Ability to browse the database history for previous statistics.
