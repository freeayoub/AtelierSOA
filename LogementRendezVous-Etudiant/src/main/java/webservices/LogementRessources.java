package webservices;

import metiers.LogementBusiness;
import entities.Logement;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/logement")
public class LogementRessources {
   static LogementBusiness help = new LogementBusiness();
    @GET
    @Path("/getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response  getAll(){
        return Response.
                status(200).header("Access-Control-Allow-Origin", "*").
                entity(help.getLogements()).
                build();
    }
    @POST
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/new")
    public Response addLogement(Logement logement){

        help.addLogement(logement);
        return Response
                .status(201).header("Access-Control-Allow-Origin", "*")
                .entity("logement a été ajouté avec succssee")
                .build();
    }
    @DELETE
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/del/{id}")
    public Response deleteLogement(@PathParam("id") int id){
        boolean result = help.deleteLogement(id);
        if (!result) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Logement non trouvé ou déjà supprimé")
                    .build();
        }
        return Response.ok("Logement supprimé avec succès").build();
    }
    @PUT
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/update/{id}")
    public Response updateLogement(@PathParam("id") int id, Logement logement){
        boolean result = help.updateLogement(id, logement);
        if (!result) {
            return Response.status(404).entity("Impossible de mettre à jour le logement").build();
        }
        return Response.status(200).entity("Logement mis à jour avec succès").build();
    }


}
