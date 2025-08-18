export const consultas = {
  cargos: {
    nombre: "Cargos de cargos",
    url: "tabla/usuario.cargo?limit=15",
    descripcion: "Consulta los cargos de cargos",
  },
  procesos: {
    nombre: "Procesos ejecutados",
    url: "consulta",
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
    url: "tabla/usuario.tabtipoliquidacion",
    descripcion: "Tipo de liquidaciones",
  },
  ctrlIncDoc: {
    nombre: "Control Inc Doc",
    url: "consulta",
    method: "POST",
    descripcion: "Resumen de liquidacion",
    sql: `select c.idrep, l.idtipoliquidacion, l.idgrupo, con.codigo,sum(li.IMP) IMPORTE, count(li.imp) CANTIDAD
    from usuario.cargo c
    inner join usuario.liquidacion l on l.idocupcarg = c.idocupcarg
    inner join usuario.liquidacionitem li on li.idliq = l.idliq
    inner join usuario.concepto con on con.idconcepto = li.idconcepto and con.codigo = 0
    where l.idtipoliquidacion in (6,8)
    and l.idgrupo in (1, 2 ,3)
    and c.idestadocargo = 1 and c.fechabaja is null
    and l.FECHAEMISION = usuario.f_activo
    and l.idtipoliquidacion = c.idtipoliquidacion
    and c.idrep in (18,21,25,26,27)
    group by rollup((l.idtipoliquidacion,  l.idgrupo), (c.idrep,con.codigo))
    order by l.idtipoliquidacion,l.idgrupo`,
  },
};

export const consultasControl = {  
  ctrlIncDoc: {
    nombre: "Control Inc Doc",
    url: "consulta",
    method: "POST",
    descripcion: "Resumen de liquidacion",
    sql: `select c.idrep, l.idtipoliquidacion, l.idgrupo, con.codigo,sum(li.IMP) IMPORTE, count(li.imp) CANTIDAD
    from usuario.cargo c
    inner join usuario.liquidacion l on l.idocupcarg = c.idocupcarg
    inner join usuario.liquidacionitem li on li.idliq = l.idliq
    inner join usuario.concepto con on con.idconcepto = li.idconcepto and con.codigo = 0
    where l.idtipoliquidacion in (6,8)
    and l.idgrupo in (1, 2 ,3)
    and c.idestadocargo = 1 and c.fechabaja is null
    and l.FECHAEMISION = usuario.f_activo
    and l.idtipoliquidacion = c.idtipoliquidacion
    and c.idrep in (18,21,25,26,27)
    group by rollup((l.idtipoliquidacion,  l.idgrupo), (c.idrep,con.codigo))
    order by l.idtipoliquidacion,l.idgrupo`,
  },
  tipoliq: {
    nombre: "Liquidaciones",
    url: "tabla/usuario.tabtipoliquidacion",
    descripcion: "Tipo de liquidaciones",
  }
};
