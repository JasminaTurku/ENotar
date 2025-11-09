import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 28px;
  margin: 0;
`;

const Badge = styled.span`
  background: #e74c3c;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  margin-left: 15px;
`;

const RefreshButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #2980b9;
  }

  &:disabled {
    background: #95a5a6;
    cursor: not-allowed;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const Thead = styled.thead`
  background: #34495e;
  color: white;
`;

const Th = styled.th`
  padding: 15px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Tbody = styled.tbody`
  tr:nth-child(even) {
    background: #f8f9fa;
  }

  tr:hover {
    background: #e8f4f8;
  }
`;

const Td = styled.td`
  padding: 15px;
  border-bottom: 1px solid #ecf0f1;
  font-size: 14px;
  color: #2c3e50;
`;

const CodeCell = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Code = styled.code`
  background: #f1c40f;
  color: #2c3e50;
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 13px;
  letter-spacing: 1px;
`;

const CopyButton = styled.button`
  background: #27ae60;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;

  &:hover {
    background: #229954;
  }

  &:active {
    transform: scale(0.95);
  }

  &.copied {
    background: #7f8c8d;
  }
`;

const StatusBadge = styled.span`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;

  &.pending {
    background: #ffe4b5;
    color: #e67e22;
  }

  &.used {
    background: #d5f5e3;
    color: #27ae60;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #7f8c8d;
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  background: #fadbd8;
  color: #c0392b;
  padding: 15px 20px;
  border-radius: 6px;
  margin-bottom: 20px;
  border-left: 4px solid #e74c3c;
`;

const AdminPanel = () => {
  const [notari, setNotari] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedKod, setCopiedKod] = useState(null);

  const fetchNotari = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/admin/neaktivirani-notari",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotari(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Greška pri učitavanju notara");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotari();
  }, []);

  const copyToClipboard = (kod, id) => {
    navigator.clipboard.writeText(kod);
    setCopiedKod(id);
    setTimeout(() => setCopiedKod(null), 2000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("sr-RS", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const pendingCount = notari.filter((n) => !n.iskoriscen).length;

  return (
    <Container>
      <Header>
        <div>
          <Title>
            Admin Panel - Verifikacioni Kodovi
            {pendingCount > 0 && <Badge>{pendingCount} na čekanju</Badge>}
          </Title>
        </div>
        <RefreshButton onClick={fetchNotari} disabled={loading}>
          {loading ? "⟳ Učitavanje..." : "↻ Osveži"}
        </RefreshButton>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {!loading && notari.length === 0 ? (
        <EmptyState>
          ✓ Nema neaktivnih notara. Svi notari su aktivirani!
        </EmptyState>
      ) : (
        <Table>
          <Thead>
            <tr>
              <Th>ID</Th>
              <Th>Ime i Prezime</Th>
              <Th>Email</Th>
              <Th>Grad</Th>
              <Th>Telefon</Th>
              <Th>Verifikacioni Kod</Th>
              <Th>Datum Kreiranja</Th>
              <Th>Status</Th>
            </tr>
          </Thead>
          <Tbody>
            {notari.map((notar) => (
              <tr key={notar.id}>
                <Td>{notar.id}</Td>
                <Td style={{ fontWeight: 600 }}>{notar.ime}</Td>
                <Td>{notar.email}</Td>
                <Td>{notar.gradovi}</Td>
                <Td>{notar.telefon}</Td>
                <Td>
                  <CodeCell>
                    <Code>{notar.kod}</Code>
                    <CopyButton
                      onClick={() => copyToClipboard(notar.kod, notar.id)}
                      className={copiedKod === notar.id ? "copied" : ""}
                    >
                      {copiedKod === notar.id ? "✓ Kopirano" : "Kopiraj"}
                    </CopyButton>
                  </CodeCell>
                </Td>
                <Td>{formatDate(notar.kreiran_datum)}</Td>
                <Td>
                  <StatusBadge
                    className={notar.iskoriscen ? "used" : "pending"}
                  >
                    {notar.iskoriscen ? "Iskorišćen" : "Na čekanju"}
                  </StatusBadge>
                </Td>
              </tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdminPanel;
