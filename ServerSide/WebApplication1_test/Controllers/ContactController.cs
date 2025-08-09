using Microsoft.AspNetCore.Mvc;
using WebApplication1_test.Models;
using Microsoft.Data.SqlClient;

namespace WebApplication1_test.Controllers
{
    [ApiController]
    [Route("api/contact")]
    public class ContactController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> PostContact([FromBody] ContactModel model)
        {
            using (SqlConnection conn = new SqlConnection("Server=DBinformation.mssql.somee.com; Initial Catalog=DBinformation; User Id=Desk5; Password=Morjan-123; Encrypt=True; TrustServerCertificate=True"))
            {
                string query = "INSERT INTO ContactForm (Name, Email, Message) VALUES (@Name, @Email, @Message)";
                SqlCommand cmd = new SqlCommand(query, conn);

                cmd.Parameters.AddWithValue("@Name", model.Name);
                cmd.Parameters.AddWithValue("@Email", model.Email);
                cmd.Parameters.AddWithValue("@Message", model.Message);

                await conn.OpenAsync();
                await cmd.ExecuteNonQueryAsync();
                return Ok("Message saved to database");
            }
        }
    }
}
