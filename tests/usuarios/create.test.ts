import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - Create", () => {

  it("Cria registro", async () => {
   const res1 = await testServer.post("/usuario").send({
      nome: "rubens",
      nick: "rubenschff",
      password: "a321321",
      date_of_birth: "02/02/2000",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
  });

  it("Criar registro sem senha!", async () => {
    const res1 = await testServer.post("/usuario").send({
       nome: "rubens",
       nick: "rubenschff",
       date_of_birth: "02/02/2000",
     });
 
     expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
     expect(res1.body).toHaveProperty('errors.body.password');
   });
});
