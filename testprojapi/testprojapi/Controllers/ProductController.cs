using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using testprojapiDAL.Context;
using testprojapiDAL.Entities;

namespace testprojapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("MyCORSPolicy")]
    public class ProductController : Controller
    {
        private TestProjContext _testDBcontext;

        public ProductController(TestProjContext testProjContext)
        {
            _testDBcontext = testProjContext;
        }

        [HttpGet]
        [Route("GetProducts")]
        public string GetProducts()
        {
            //Return all the products from the DB
            List<Product> products = _testDBcontext.Products.ToList();

            return JsonConvert.SerializeObject(products);
        }
    }
}
