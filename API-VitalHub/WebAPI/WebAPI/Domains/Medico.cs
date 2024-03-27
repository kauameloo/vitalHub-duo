using System;
using System.Collections.Generic;

namespace WebAPI.Domains;

public partial class Medico
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid? EspecialidadeId { get; set; }

    public string? Crm { get; set; }

<<<<<<< HEAD
=======
    public Guid? EnderecoId { get; set; }

    public virtual Endereco? Endereco { get; set; }

>>>>>>> kallan
    public virtual Especialidade? Especialidade { get; set; }

    public virtual Usuario IdNavigation { get; set; } = null!;

    public virtual ICollection<MedicosClinica> MedicosClinicas { get; set; } = new List<MedicosClinica>();
}
