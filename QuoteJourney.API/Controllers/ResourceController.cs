using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace QuoteJourney.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class ActivityController : ApiController
{
    [HttpPost("Create", Name = "CreateActivity")]
    public async Task<ActionResult<ActivityDto>> CreateActivity([FromBody] CreateActivityCommand command)
    {
        var createdActivity = await Sender.Send(command);

        return CreatedAtAction(nameof(CreateActivity), createdActivity);
    }

    [HttpDelete("Delete/{activityId:guid}", Name = "DeleteActivity")]
    public async Task<IActionResult> DeleteActivity(Guid activityId)
    {
        await Sender.Send(new DeleteActivityCommand(activityId));
        return NoContent();
    }

    [HttpPut("Update", Name = "UpdateActivity")]
    public async Task<IActionResult> UpdateActivity([FromBody] UpdateActivityCommand command)
    {
        await Sender.Send(command);
        return NoContent();
    }

    [HttpPut("{activityId:guid}/LinkJob/{jobId:guid}", Name = "LinkJob")]
    public async Task<IActionResult> LinkJob([FromRoute] Guid activityId, [FromRoute] Guid jobId)
    {
        var command = new LinkJobCommand(activityId, jobId);

        await Sender.Send(command);
        return NoContent();
    }
}
