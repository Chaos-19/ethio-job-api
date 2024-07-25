# Ethio Job scraper API

This is the API documentation for the Ethio Job Scraper API. It retrieves job listings from the database with optional filters and sorting options.

## Authentication

Use the `x-api-key` header for authentication. Ensure that the `x-api-key` header is included in your request to access this endpoint.

**Example:**

x-api-key: $2b$10$nmoPHzeiiBfB8i828GQQ/.Fk1Joiutok01.yFRxYIGQZidpGvamge


## Endpoints

### Retrieve Jobs

**GET /jobs**

Retrieve job listings from the database with optional filters and sorting options.

**Parameters:**
- `filter`: (optional) Apply filters to the job listings.
- `sort`: (optional) Apply sorting to the job listings.

**Response:**
```json
{
  "jobs": [
    {
      "id": "1",
      "title": "Software Engineer",
      "company": "Example Company",
      "location": "Addis Ababa",
      "description": "Job description here...",
      "posted_date": "2023-07-25"
    },
  ]
}
```

## Example Request

```bash
curl -H "x-api-key: $2b$10$nmoPHzeiiBfB8i828GQQ/.Fk1Joiutok01.yFRxYIGQZidpGvamge" \
     -X GET "https://api.example.com/jobs?filter=location:Addis%20Ababa&sort=posted_date:desc"
```

## Development

To set up the development environment, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Chaos-19/ethio-job-scraper-api.git
    ```

2. Navigate to the project directory:
    ```bash
    cd ethio-job-scraper-api
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

## Contribution

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or support, please contact [kalgetachew375@gmail.com](mailto:kalgetachew375@gmail.com).


Thank you for using the Ethio Job Scraper API!
