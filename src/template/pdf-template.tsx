import ReactPDF, {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
} from "@react-pdf/renderer";

import React from "react";

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const Quixote = () => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed>
        ~ Created with react-pdf ~
      </Text>
      <Text style={styles.title}>Don Quijote de la Mancha</Text>
      <Text style={styles.author}>Miguel de Cervantes</Text>
      <Image
        style={styles.image}
        src="https://cdn.britannica.com/12/154812-050-D4E47005/Don-Quixote-Sancho-Panza-illustration-Miguel-de.jpg?w=300&h=169&c=crop"
      />
      <Text style={styles.subtitle}>
        Capítulo I: Que trata de la condición y ejercicio del famoso hidalgo D.
        Quijote de la Mancha
      </Text>
      <Text style={styles.text}>
        En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha...
      </Text>
      <Text style={styles.text}>
        Es, pues, de saber, que este sobredicho hidalgo...
      </Text>
      <Text style={styles.text}>
        Con estas y semejantes razones perdía el pobre caballero el...
      </Text>
      <Text style={styles.text}>
        En resolución, él se enfrascó tanto en su lectura...
      </Text>
      <Text style={styles.subtitle} break>
        Capítulo II: Que trata de la primera salida que de su tierra hizo el
        ingenioso Don Quijote
      </Text>
      <Image
        style={styles.image}
        src="https://cdn.britannica.com/12/154812-050-D4E47005/Don-Quixote-Sancho-Panza-illustration-Miguel-de.jpg?w=300&h=169&c=crop"
      />
      <Text style={styles.text}>Hechas, pues, estas prevenciones...</Text>
      <Text style={styles.text}>
        Yendo, pues, caminando nuestro flamante aventurero...
      </Text>
      <Text style={styles.text}>Y era la verdad que por él caminaba...</Text>
      <Text style={styles.text}>Luego volvía diciendo...</Text>
      <Text style={styles.text}>
        Casi todo aquel día caminó sin acontecerle cosa que de contar fuese...
      </Text>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);

export const pdfTemplate = async () => {
  return await ReactPDF.renderToStream(<Quixote />);
};
