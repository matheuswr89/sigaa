export const menuDisicplinaDrop = ({ javaxMenuDrop }: any) => {
  return [
    {
      id: 1,
      name: "Participantes",
      requests: {
        formMenuDrop: "formMenuDrop",
        "javax.faces.ViewState": javaxMenuDrop,
        "formMenuDrop:menuParticipantes:hidden":
          "formMenuDrop:menuParticipantes",
      },
    },
    {
      id: 4,
      name: "Fóruns",
      requests: {
        formMenuDrop: "formMenuDrop",
        "javax.faces.ViewState": javaxMenuDrop,
        "formMenuDrop:menuAcessarForuns:hidden":
          "formMenuDrop:menuAcessarForuns",
      },
    },
    {
      id: 2,
      name: "Frequência",
      requests: {
        formMenuDrop: "formMenuDrop",
        "javax.faces.ViewState": javaxMenuDrop,
        "formMenuDrop:menuFrequencia:hidden": "formMenuDrop:menuFrequencia",
      },
    },
    {
      id: 6,
      name: "Ver Grupo",
      requests: {
        formMenuDrop: "formMenuDrop",
        "javax.faces.ViewState": javaxMenuDrop,
        "formMenuDrop:menuVerGrupo:hidden": "formMenuDrop:menuVerGrupo",
      },
    },
    {
      id: 3,
      name: "Ver notas",
      requests: {
        formMenuDrop: "formMenuDrop",
        "javax.faces.ViewState": javaxMenuDrop,
        "formMenuDrop:menuVerNotas:hidden": "formMenuDrop:menuVerNotas",
      },
    },
    {
      id: 5,
      name: "Tarefas",
      requests: {
        formMenuDrop: "formMenuDrop",
        "javax.faces.ViewState": javaxMenuDrop,
        "formMenuDrop:menuTarefas:hidden": "formMenuDrop:menuTarefas",
      },
    },
  ];
};

export const menuDisicplina = ({
  menuCode,
  javax,
  menuCode1,
  tipoAluno,
}: any) => {
  return [
    {
      id: 12938,
      name: menuCode[0]
        ?.querySelectorAll("td.rich-panelbar-content > a")[3]
        ?.textContent.trim(),
      formMenu: "formMenu",
      formMenu0: menuCode1,
      formMenu1: menuCode[0]?.id,
      javax: javax,
      formMenu2: menuCode[0]
        ?.querySelectorAll("td.rich-panelbar-content > a")[3]
        ?.rawAttrs.substring(
          menuCode[0]
            ?.querySelectorAll("td.rich-panelbar-content > a")[3]
            ?.rawAttrs.indexOf("':'") + 3,
          menuCode[0]
            ?.querySelectorAll("td.rich-panelbar-content > a")[3]
            ?.rawAttrs.indexOf("'},")
        ),
    },
    {
      id: 12945,
      name: menuCode[0]
        ?.querySelectorAll("td.rich-panelbar-content > a")
        [tipoAluno === "medio" ? 4 : 5]?.textContent.trim(),
      formMenu: "formMenu",
      formMenu0: menuCode1,
      formMenu1: menuCode[0]?.id,
      javax: javax,
      formMenu2: menuCode[0]
        ?.querySelectorAll("td.rich-panelbar-content > a")
        [tipoAluno === "medio" ? 4 : 5]?.rawAttrs.substring(
          menuCode[0]
            ?.querySelectorAll("td.rich-panelbar-content > a")
            [tipoAluno === "medio" ? 4 : 5]?.rawAttrs.indexOf("':'") + 3,
          menuCode[0]
            ?.querySelectorAll("td.rich-panelbar-content > a")
            [tipoAluno === "medio" ? 4 : 5]?.rawAttrs.indexOf("'},")
        ),
    },
    {
      id: 12940,
      name: menuCode[1]
        ?.querySelectorAll("td.rich-panelbar-content > a")[0]
        ?.textContent.trim(),
      formMenu: "formMenu",
      formMenu0: menuCode1,
      formMenu1: menuCode[1]?.id,
      javax: javax,
      formMenu2: menuCode[1]
        ?.querySelectorAll("td.rich-panelbar-content > a")[0]
        ?.rawAttrs.substring(
          menuCode[1]
            ?.querySelectorAll("td.rich-panelbar-content > a")[0]
            ?.rawAttrs.indexOf("':'") + 3,
          menuCode[1]
            ?.querySelectorAll("td.rich-panelbar-content > a")[0]
            ?.rawAttrs.indexOf("'},")
        ),
    },
    {
      id: 12990,
      name: menuCode[1]
        ?.querySelectorAll("td.rich-panelbar-content > a")[1]
        ?.textContent.trim(),
      formMenu: "formMenu",
      formMenu0: menuCode1,
      formMenu1: menuCode[1]?.id,
      javax: javax,
      formMenu2: menuCode[1]
        ?.querySelectorAll("td.rich-panelbar-content > a")[1]
        ?.rawAttrs.substring(
          menuCode[1]
            ?.querySelectorAll("td.rich-panelbar-content > a")[1]
            ?.rawAttrs.indexOf("':'") + 3,
          menuCode[1]
            ?.querySelectorAll("td.rich-panelbar-content > a")[1]
            ?.rawAttrs.indexOf("'},")
        ),
    },
    {
      id: 12941,
      name: menuCode[1]
        ?.querySelectorAll("td.rich-panelbar-content > a")[2]
        ?.textContent.trim(),
      formMenu: "formMenu",
      formMenu0: menuCode1,
      formMenu1: menuCode[1]?.id,
      javax: javax,
      formMenu2: menuCode[1]
        ?.querySelectorAll("td.rich-panelbar-content > a")[2]
        ?.rawAttrs.substring(
          menuCode[1]
            ?.querySelectorAll("td.rich-panelbar-content > a")[2]
            ?.rawAttrs.indexOf("':'") + 3,
          menuCode[1]
            ?.querySelectorAll("td.rich-panelbar-content > a")[2]
            ?.rawAttrs.indexOf("'},")
        ),
    },
    {
      id: 12942,
      name: menuCode[3]
        ?.querySelectorAll("td.rich-panelbar-content > a")[2]
        ?.textContent.trim(),
      formMenu: "formMenu",
      formMenu0: menuCode1,
      formMenu1: menuCode[1]?.id,
      javax: javax,
      formMenu2: menuCode[3]
        ?.querySelectorAll("td.rich-panelbar-content > a")[2]
        ?.rawAttrs.substring(
          menuCode[3]
            ?.querySelectorAll("td.rich-panelbar-content > a")[2]
            ?.rawAttrs.indexOf("':'") + 3,
          menuCode[3]
            ?.querySelectorAll("td.rich-panelbar-content > a")[2]
            ?.rawAttrs.indexOf("'},")
        ),
    },
  ];
};
