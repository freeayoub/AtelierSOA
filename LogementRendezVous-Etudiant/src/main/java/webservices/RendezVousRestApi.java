package webservices;
import entities.RendezVous;
import metiers.RendezVousBusiness;

import javax.ws.rs.*;
        import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/rendezvous")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RendezVousRestApi {
    private static final RendezVousBusiness rendezVousBusiness = new RendezVousBusiness();

    @GET
    @Path("/list")
    public Response getAll() {
        List<RendezVous> rendezVousList = rendezVousBusiness.getListeRendezVous();
        if (rendezVousList.isEmpty()) {
            return Response.status(Response.Status.NO_CONTENT)
                    .entity("Aucun rendez-vous trouvé")
                    .build();
        }
        return Response.ok(rendezVousList).build();
    }

    @GET
    @Path("/getById/{id}")
    public Response getRendezVousById(@PathParam("id") int id) {
        RendezVous rendezVous = rendezVousBusiness.getRendezVousById(id);
        if (rendezVous == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Rendez-vous non trouvé")
                    .build();
        }
        return Response.ok(rendezVous).build();
    }

    @POST
    @Path("/new")
    public Response addRendezVous(RendezVous rendezVous) {
        if (rendezVous == null || rendezVous.getLogement() == null || rendezVous.getNumTel() == null || rendezVous.getDate() == null || rendezVous.getHeure() == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Données invalides : assurez-vous que tous les champs sont remplis")
                    .build();
        }

        boolean added = rendezVousBusiness.addRendezVous(rendezVous);
        if (!added) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Erreur lors de l'ajout du rendez-vous")
                    .build();
        }

        return Response.status(Response.Status.CREATED)
                .entity("Rendez-vous ajouté avec succès")
                .build();
    }

    @DELETE
    @Path("/del/{id}")
    public Response deleteRendezVous(@PathParam("id") int id) {
        boolean result = rendezVousBusiness.deleteRendezVous(id);
        if (!result) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Rendez-vous non trouvé ou déjà supprimé")
                    .build();
        }
        return Response.ok("Rendez-vous supprimé avec succès").build();
    }

    @PUT
    @Path("/update/{id}")
    public Response updateRendezVous(@PathParam("id") int id, RendezVous rendezVous) {
        if (rendezVous == null || rendezVous.getLogement() == null || rendezVous.getNumTel() == null || rendezVous.getDate() == null || rendezVous.getHeure() == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Données invalides pour la mise à jour")
                    .build();
        }

        boolean result = rendezVousBusiness.updateRendezVous(id, rendezVous);
        if (!result) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Impossible de mettre à jour le rendez-vous : ID introuvable")
                    .build();
        }
        return Response.ok("Rendez-vous mis à jour avec succès").build();
    }
}
