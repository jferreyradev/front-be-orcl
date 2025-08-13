export const consultas = {
  cargos: {
    nombre: "Cargos de cargos",
    url: "http://localhost:9000/tabla/usuario.cargo?limit=15",
    descripcion: "Consulta los cargos de cargos",
  },
  procesos: {
    nombre: "Procesos ejecutados",
    url: "http://localhost:9000/consulta",
    method: "POST",
    descripcion: "Lista de procesos ejecutados",
    sql: `SELECT ed.ID_PROC_DET,
       PD.DESCRIPCION as DESC_PROC_DET,
       ed.ORDENEJEC, ed.ESTADO, ec.GRUPOREP
from WORKFLOW.EJEC_DET ed
inner join WORKFLOW.EJEC_CAB ec on EC.ID_EJEC_CAB = ED.ID_EJEC_CAB
inner join WORKFLOW.PROC_CAB pc on PC.ID_PROC_CAB = EC.ID_PROC_CAB
inner join WORKFLOW.PROC_DET pd on PD.ID_PROC_DET = ED.ID_PROC_DET
inner join WORKFLOW.PROC_CAB_ORDEN o on O.ID_PROC_CAB = PC.ID_PROC_CAB
where periodo = to_Date('01/08/2025','dd/mm/yyyy')
and EC.IDTIPOLIQ = 1
order by o.orden, ec.fechahora, ED.ORDENEJEC`,
  },
  tipoliq: {
    nombre: "Liquidaciones",
    url: "http://localhost:9000/tabla/usuario.tabtipoliquidacion",
    descripcion: "Tipo de liquidaciones",
  }
};
