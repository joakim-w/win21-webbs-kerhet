using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using WebApp_FileUppload.Models;

namespace WebApp_FileUppload.Controllers
{
    public class FileController : Controller
    {
        private BlobServiceClient serviceClient;
        private BlobContainerClient containerClient;
        private BlobClient blobClient;

        public FileController(IConfiguration configuration)
        {
            serviceClient = new BlobServiceClient(configuration.GetConnectionString("StorageAccount"));

            try 
            {
                containerClient = serviceClient.CreateBlobContainer("images");
                containerClient.SetAccessPolicy(Azure.Storage.Blobs.Models.PublicAccessType.BlobContainer);
            }
            catch { containerClient = serviceClient.GetBlobContainerClient("images"); }
        }

        public IActionResult Index()
        {
            var image = new FileModel();
            return View(image);
        }

        [HttpPost]
        public async Task<IActionResult> Upload(FileModel file)
        {
            try 
            {
                using var image = file.Image.OpenReadStream();

                blobClient = containerClient.GetBlobClient($"IMG_{Guid.NewGuid()}{Path.GetExtension(file.Image.FileName)}");
                await blobClient.UploadAsync(image);

                
            }
            catch (Exception ex) { Debug.WriteLine(ex.Message); }
            return RedirectToAction(nameof(Index));
        }
    }
}
